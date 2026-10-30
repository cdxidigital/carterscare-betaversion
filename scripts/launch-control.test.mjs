import test from 'node:test';
import assert from 'node:assert/strict';
import { isIsoDay, issueMarker, renderCheckpoint, validatePlan, validatePublicUrl } from './launch-control.mjs';

const valid = {
  timezone: 'Australia/Perth',
  baselineDate: '2026-10-30',
  releases: { productionTarget: '2026-11-16' },
  checkpoints: [{
    id: 'pilot-gate', due: '2026-11-02', title: 'Pilot review',
    owner: 'Service owner', gate: 'Real data access blocked until approved'
  }]
};

test('validates ISO dates including impossible calendar days', () => {
  assert.equal(isIsoDay('2026-11-02'), true);
  assert.equal(isIsoDay('2026-02-30'), false);
});

test('accepts a valid ordered launch plan', () => {
  assert.equal(validatePlan(valid), valid);
});

test('rejects duplicate checkpoint IDs and earlier dates', () => {
  assert.throws(() => validatePlan({ ...valid, checkpoints: [...valid.checkpoints, valid.checkpoints[0]] }), /duplicate/i);
  assert.throws(() => validatePlan({ ...valid, checkpoints: [{...valid.checkpoints[0], due:'2026-10-01'}] }), /date\/order/i);
});

test('renders stable marker for issue deduplication', () => {
  assert.ok(renderCheckpoint(valid.checkpoints[0]).includes(issueMarker('pilot-gate')));
  assert.ok(issueMarker('pilot-gate').startsWith('<!--'));
});

test('rejects unsafe public probe URLs', () => {
  assert.equal(validatePublicUrl('https://example.com/'), 'https://example.com');
  for (const url of [
    '', 'http://example.com', 'https://localhost', 'https://dev.local',
    'https://example.com/private', 'https://user:pass@example.com',
    'https://example.com/?token=secret'
  ]) {
    assert.throws(() => validatePublicUrl(url));
  }
});
