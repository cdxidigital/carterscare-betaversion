import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const PATH = resolve(process.cwd(), 'ops/launch-plan.json');

export function isIsoDay(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value + 'T00:00:00Z')) &&
    new Date(value + 'T00:00:00Z').toISOString().slice(0, 10) === value;
}

export function validatePlan(plan) {
  if (!plan || !Array.isArray(plan.checkpoints) || !plan.checkpoints.length)
    throw new Error('Launch plan needs dated checkpoints');
  if (plan.timezone !== 'Australia/Perth' || !isIsoDay(plan.baselineDate))
    throw new Error('Launch plan timezone/baseline invalid');
  for (const date of Object.values(plan.releases || {}))
    if (!isIsoDay(date)) throw new Error('Invalid launch date: ' + date);
  const seen = new Set();
  let last = plan.baselineDate;
  for (const item of plan.checkpoints) {
    if (!/^[a-z][a-z0-9-]{2,64}$/.test(item.id || '') || seen.has(item.id))
      throw new Error('Invalid/duplicate checkpoint id: ' + item.id);
    if (!isIsoDay(item.due) || item.due < last)
      throw new Error('Invalid checkpoint date/order: ' + item.id);
    if (!['title', 'owner', 'gate'].every(key => typeof item[key] === 'string' && item[key].trim()))
      throw new Error('Missing checkpoint fields: ' + item.id);
    seen.add(item.id);
    last = item.due;
  }
  return plan;
}

export function issueMarker(id) {
  return '<!-- cdxi-care-checkpoint:' + id + ' -->';
}

export function renderCheckpoint(item) {
  return issueMarker(item.id) + '\n**Due (AWST):** ' + item.due +
    '\n\n**Accountable role:** ' + item.owner +
    '\n\n**Evidence gate:** ' + item.gate +
    '\n\n**Action:** Complete evidence, link the tests and record responsible owner sign-off. ' +
    'Do not close only because the due date has passed.\n\n' +
    'Never put participant/worker private data in GitHub. See ops/LAUNCH_ROADMAP.md and ops/RUNBOOK.md.';
}

export function validatePublicUrl(input) {
  if (!input) throw new Error('CARTERSCARE_PUBLIC_URL is not set; uptime probe is inactive');
  const url = new URL(input);
  if (url.protocol !== 'https:' || url.username || url.password || url.search ||
      url.hash || url.pathname !== '/' || url.hostname === 'localhost' ||
      url.hostname.endsWith('.local') || url.hostname.endsWith('.internal'))
    throw new Error('Public URL must be an HTTPS site origin with no embedded credentials/query');
  return url.origin;
}

function getEnv() {
  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo) || !token)
    throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN must be supplied');
  return { repo, token };
}

async function github(env, method, apiPath, body) {
  const response = await fetch('https://api.github.com/repos/' + env.repo + '/' + apiPath, {
    method,
    headers: {
      Authorization: 'Bearer ' + env.token,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error('GitHub HTTP ' + response.status + ' for ' + method + ' ' + apiPath);
  return response.status === 204 ? null : response.json();
}

async function allIssues(env) {
  const items = [];
  for (let page = 1; page <= 20; page++) {
    const batch = await github(env, 'GET', 'issues?state=all&per_page=100&page=' + page);
    items.push(...batch.filter(item => !item.pull_request));
    if (batch.length < 100) return items;
  }
  throw new Error('Issue pagination limit reached: refusing incomplete dedupe');
}

async function summary(message) {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  const { appendFile } = await import('node:fs/promises');
  await appendFile(process.env.GITHUB_STEP_SUMMARY, message + '\n');
}

async function syncCheckpoints(plan) {
  const env = getEnv();
  const issues = await allIssues(env);
  let created = 0;
  for (const item of plan.checkpoints) {
    if (issues.some(issue => (issue.body || '').includes(issueMarker(item.id)))) continue;
    const issue = await github(env, 'POST', 'issues', {
      title: '[Launch ' + item.due + '] ' + item.title, body: renderCheckpoint(item)
    });
    console.log('Created checkpoint #' + issue.number + ' (' + item.id + ')');
    issues.push(issue);
    created++;
  }
  await summary('Checkpoint sync: ' + created + ' new; ' + plan.checkpoints.length + ' total.');
  console.log('Checkpoint sync completed: ' + created + ' new');
}

async function probe() {
  const origin = validatePublicUrl(process.env.CARTERSCARE_PUBLIC_URL);
  for (const path of ['/', '/login']) {
    const res = await fetch(origin + path, { redirect: 'manual', signal: AbortSignal.timeout(12000) });
    if (res.status !== 200 || !(res.headers.get('content-type') || '').includes('text/html'))
      throw new Error('Public probe ' + path + ' returned HTTP ' + res.status + ' or not HTML');
    const html = await res.text();
    if (html.length < 100) throw new Error('Public HTML suspiciously small on ' + path);
    console.log('OK: ' + path + ', HTTP 200, ' + html.length + ' chars');
  }
  await summary('Unauthenticated HTML probe succeeded on ' + origin + ' (not a login/E2E test).');
}

async function alert() {
  const env = getEnv();
  const checks = ['SYNC_RESULT', 'QUALITY_RESULT', 'LIVE_RESULT'];
  const values = checks.map(key => ({ key, value: process.env[key] || 'unknown' }));
  if (values.every(x => x.value === 'success')) {
    console.log('Daily verification passed');
    return;
  }
  const marker = '<!-- cdxi-care-ops-alert:daily-verification -->';
  const issues = await allIssues(env);
  const runUrl = 'https://github.com/' + env.repo + '/actions/runs/' +
    encodeURIComponent(process.env.GITHUB_RUN_ID || 'unknown');
  const prior = issues.find(item => item.state === 'open' && (item.body || '').includes(marker));
  if (prior) {
    console.log('Alert remains open: #' + prior.number + '; latest run ' + runUrl);
    await summary('Outstanding regression: #' + prior.number + '. ' + runUrl);
    return;
  }
  const body = marker + '\nAutomatic operations regression.\n\n' +
    values.map(x => '- ' + x.key + ': ' + x.value).join('\n') +
    '\n\nWorkflow: ' + runUrl +
    '\n\nMissing CARTERSCARE_PUBLIC_URL is a monitoring setup failure. ' +
    'Investigate before closing. Do not paste health/participant data in this issue.';
  const created = await github(env, 'POST', 'issues', {
    title: '[AUTOPILOT ALERT] Daily verification failing or monitoring missing', body
  });
  await summary('New regression issue #' + created.number + '. ' + runUrl);
  console.log('Created alert #' + created.number);
}

export async function main(command) {
  const plan = validatePlan(JSON.parse(await readFile(PATH, 'utf8')));
  if (command === 'validate') {
    console.log('Valid: ' + plan.checkpoints.length + ' checkpoints; target ' + plan.releases.productionTarget);
    return;
  }
  if (command === 'checkpoints') return syncCheckpoints(plan);
  if (command === 'probe') return probe();
  if (command === 'alerts') return alert();
  throw new Error('Usage: node scripts/launch-control.mjs validate|checkpoints|probe|alerts');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv[2]).catch(err => {
    console.error('[launch-control] ' + err.message);
    process.exitCode = 1;
  });
}
