# Carter's Care Group: automated release and post-launch plan

**Baseline:** 30 October 2026 (Australia/Perth).
**Source:** https://github.com/cdxidigital/carterscare-betaversion
**Machine-readable milestones:** [launch-plan.json](launch-plan.json)
**Operating instructions:** [RUNBOOK.md](RUNBOOK.md)

## Audit evidence and limits

The supplied repository contains a React/TanStack Start application with client and worker portals, client records, care plans, case notes, incidents, rostering, staff compliance, timesheets, invoices, onboarding and administration screens. Existing commands include `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`. Source also includes browser-smoke tooling.

**Critical blockers found:**
- `src/lib/cc/seed.ts` includes demo identities, access values and illustrative operational records.
- `src/lib/cc/session.tsx` uses browser-stored local demo sessions; `src/features/cc/login-page.tsx` exposes demo login.
- `src/lib/cc/store.ts` stores operational data in Zustand `localStorage`, not a durable access-controlled backend.
- A generic `src/lib/auth` and `src/lib/db` integration exists, but the care-domain screens are not demonstrated to use server-authorized database records.
- The inspected default branch had no `.github/workflows` and no branch protection.
- **Vercel mismatch:** the connected `carterscare-beta` project links to `cdxidigital/carterscare-beta`, not this repository. Existing deployment belongs to a different source. Never redeploy it merely because names resemble each other.

**Meaning:** we can move a conspicuously fictional-data demo rapidly, but **must not** process real disability/aged-care client data until identity, authorization, persistence and privacy controls are proven. This release-automation branch does not fix the underlying application data model.

## Three release gates

### 2 November 2026: public demo target

- Synthetic/non-identifying data only, visible demo notice, no live client accounts or real care records.
- Desktop and mobile interaction checks, functional navigation, no missing assets, basic accessibility and contact/support information.
- Owner verifies correct domain, project source, test results and service descriptions before approving publication.

### 9 November 2026: limited pilot target (conditional)

- Replace demo auth with verified server-side sessions; enforce role and per-client assignment authorization in **every** API and data query.
- Introduce a production managed database, encrypted transport/storage, secure migrations, separate staging, meaningful audit logs and retention controls.
- Validate backup and restore, consent/privacy materials, permission revocation, incident workflows and support escalation.
- No unresolved critical or high-priority security/client-safety issues. Named service owner signs pilot gate.
- Limit enrolment to consenting pilot participants; never mix sample data with genuine records.

### 16 November 2026: production target (conditional)

- Pilot results, mobile usability, core transaction integrity, access tests, disaster recovery, and client support readiness meet agreed thresholds.
- Release only the identical tested build using reviewed deployment tooling and a recorded go/no-go decision.
- Gradual rollout, observability, escalation and proven safe rollback; hold release if gate fails.

**Dates are targets, not automatic bypasses.** A failed privacy or safety gate automatically blocks progression until verified remediation.

## Pre-launch delivery sequence

| Date (AWST) | Scope | Evidence required |
|---|---|---|
| 31 Oct | P0 inventory + isolate demo | Review what data/identities are stored and whether the demo is public |
| 1 Nov | Continuous quality baseline | Typecheck, lint, tests, build; browser and mobile acceptance evidence |
| 2 Nov | Public demonstration | Service-owner demo-only approval |
| 3 Nov | Help and feedback | Safe support channel and response targets |
| 5 Nov | Production identity | Server-verified roles and cross-account denial tests |
| 6 Nov | Server-side persistence | Protected database, audit, migrations |
| 7 Nov | Backup/restore drill | Tested encrypted recovery, privacy incident plan |
| 8 Nov | Pilot decision | Security/privacy and operational sign-offs |
| 9 Nov | Small pilot | Gradual consent-based access, monitoring |
| 10 + 12 Nov | Pilot follow-ups | Usability, failures, retention and support evidence |
| 15 Nov | Production decision | All gates and responsible service-owner approval |
| 16 Nov | Production target | Staged approved release only |

## Explicit post-launch dated checkpoints

| Date | Phase | Core check |
|---|---|---|
| 17 Nov 2026 | D+1 | User access, client support, transaction correctness and incident review |
| 19 Nov 2026 | D+3 | Latency, error rate, roster integrity and backup status |
| 23 Nov 2026 | D+7 | New-user friction, highest-priority fixes and user feedback |
| 30 Nov 2026 | D+14 | Defect trends, staff training and role access |
| 16 Dec 2026 | D+30 | SLOs, support SLA, running costs and restoration |
| 15 Jan 2027 | D+60 | Feature adoption, customer satisfaction and regulatory updates |
| 14 Feb 2027 | D+90 | Audit, incident exercise, operations handover and next roadmap |
| 15 May 2027 | D+180 | Independent security review, privacy retention and accessibility |
| 16 Nov 2027 | D+365 | Annual operations, legal and security assurance |

A daily GitHub Actions job generates a stable, deduplicated issue for each of the 22 checkpoint IDs. Closing a checkpoint requires evidence and an owner; the system deliberately does not treat a past due date as proof of completion.

## Automated operation

**Every pull request:** CI verifies typecheck, lint, regression tests, dated launch-plan integrity and the build. Add required status checks to a protected main branch after confirming them on a PR. CI does not automatically publish a new production version.

**Every day at ~07:00 AWST:** GitHub Actions runs the checkpoint synchronizer, repeat tests and public origin checks (after configuration), then opens/reuses one failure issue if anything fails. Scheduled runs may be delayed or disabled by GitHub; this is not a full-service uptime monitor.

**Every Monday:** Dependabot proposes npm and GitHub Actions patches. Review and merge only after tests and compatibility/security review.

**Every real user incident:** Operations owner triages, sanitizes issue details, detects duplicates, assigns severity and requires evidence-linked regression fixes.

**Production monitoring still needed:** independent synthetic checks at least every five minutes, client/server error telemetry with privacy-safe redaction, database/backups monitoring, a real on-call escalation channel and service-owner notifications. Daily GitHub monitoring alone is not sufficient for client service continuity.

**Never fully automate:** regulatory incident reports, sensitive participant communications, destructive records operations, authorization changes, privileged secret changes, financial decisions or production promotions. Autonomy means routine checks and remediation proposals run without a developer watching, **not** unreviewed clinical or privacy decisions.

## Initial proposed service-level goals (not verified achievements)

- Zero open critical/high privacy or data-isolation defects at pilot/production go/no-go.
- At least 99% success for key client and worker test journeys during the pilot.
- At least 99.9% monthly availability when an independent production monitor is configured.
- P0 on-call escalation immediately; P1 acknowledgment within one hour with a staffed responder.
- Target RPO <= 1 hour, RTO <= 4 hours only after actual backup-restore tests substantiate them.
- All new authenticated users can complete agreed essential tasks and contact support without developer help.

## Activation checklist

1. Review this branch and open PR. Apply CI status checks, prohibit unsafe direct pushes and configure a human approver for sensitive release gates.
2. Investigate Vercel target: **the named connected project currently points to a different repository**. Link an explicitly approved project to this repository or document an intentional migration.
3. Ensure external preview/public URL uses the demo-only notice. Create repository Actions variable `CARTERSCARE_PUBLIC_URL` with exactly its confirmed HTTPS origin. Until set, public probe fails with a clear alert.
4. Enable Github Actions and issues write permission for the daily workflow. Scheduled actions begin only after merge to default branch.
5. Configure 1-5 minute external uptime monitoring, exception tracking, a contact inbox and tested on-call delivery. No sensitive data in GitHub issues.
6. Schedule first demo/pilot/production sign-offs on the dated checkpoints; do not represent postponed gated events as launched.

## Regulatory review references

- OAIC Australian Privacy Principles: https://www.oaic.gov.au/privacy/australian-privacy-principles
- OAIC Notifiable Data Breaches: https://www.oaic.gov.au/privacy/notifiable-data-breaches
- NDIS Quality and Safeguards Commission reportable incidents: https://www.ndiscommission.gov.au/reportable-incidents
- Aged Care Quality and Safety Commission strengthened standards: https://www.agedcarequality.gov.au/providers/quality-standards/strengthened-aged-care-quality-standards

These are verification sources, **not** evidence that the application has achieved NDIS, aged-care, clinical or privacy compliance.
