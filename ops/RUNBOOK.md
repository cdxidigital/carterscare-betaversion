# Carter's Care Group: operational support and incident runbook

**Draft:** appoint accountable staff, prove alert delivery and rehearse recovery before exposing real participant records.

## Operations model

Automations handle CI, daily launch checkpoints, scheduled QA and public HTML availability. An operations contact receives alerts, assigns issues and approves consequential actions. Developer attention is not required for ordinary checks, but **a human safety/privacy responder is indispensable** when incidents affect care, information security or statutory obligations.

## Detection

- GitHub Actions daily schedule checks source build and quality. A failed workflow creates a single persistent GitHub issue with a link to the run.
- Independently monitor website availability, signed-in customer workflows, front-end/backend exceptions, latency, database backups, and security/audit anomalies every 1 to 5 minutes in a production monitoring service.
- Avoid sending identifiable client notes, health/disability information, NDIS identifiers, secrets or complete authorization headers to issue trackers, logs or third-party error services.

## Severity and response ownership

| Level | Examples | Owner/target | Response |
|---|---|---|---|
| P0 | Unauthorized participant access, suspected sensitive-data breach, corrupted records | Named security/privacy on-call immediately | Contain exposed endpoint, preserve evidence, escalate to relevant governance lead; assess legal reporting obligations |
| P1 | Broad user sign-in outage, core care workflow inaccessible, faulty assigned-client visibility | Operations responder, acknowledge within 1 hour | Mitigate with verified rollback/feature disable; inform affected users through an approved channel |
| P2 | Significant issue with safe workaround | Support, 1 business day | Reproduce, prioritize and fix via reviewed test-backed PR |
| P3 | Improvement, copy or cosmetic defect | Product owner, weekly review | Batch, analyze frequency and schedule normal releases |

## Safe self-healing

**Allowed automatically:** non-destructive health probes; retry build/test jobs; open or deduplicate GitHub issues; generate dependency updates and proposed bugfix PRs; generate status summaries; publish preview builds of reviewed changes.

**Human approval remains required for:** production promotion, destructive migrations, private-data repair, changing access rights, incident-report classification, sending regulatory reports, bulk client communications, invoicing policy and financial adjustments.

**Rollbacks:** do not automatically roll back destructive or incompatible database schema migrations. Prefer a tested feature flag if a database contract was changed.

## Incident response checklist

1. Confirm alert using another signal and identify affected routes, roles and the time window.
2. For suspected unauthorized access, contain the endpoint or compromised credential immediately and escalate to privacy/security owner.
3. Capture deployment ID, commit SHA, migration version and latest backup success without recording secrets or personal data.
4. If safe, revert the immutable deployment to a previously tested build. Confirm database compatibility first.
5. Validate authenticated access isolation and core writes with synthetic test accounts.
6. Confirm alerts have cleared, notify customers through approved channels, evaluate applicable breach/incident reporting, document root cause and add a regression test.
7. Close the issue after the accountable reviewer accepts verification evidence.

## Release evidence required

- CI and authenticated functional testing passed on the exact build revision.
- No unreviewed demo credentials or browser-only care records in real-client workflows.
- Every staff query is server-authorized and limited to appropriate assigned participants.
- Staff access revocation works and is audited.
- Real database backup restore completed within approved RPO/RTO.
- Test alerts reached the actual operations responder.
- Each client/staff essential workflow can be completed on desktop and mobile.
- Pilot owner approval and privacy/security sign-off are recorded.
- A single known safe rollback procedure exists.

## Monitoring activation caveats

No GitHub variable `CARTERSCARE_PUBLIC_URL` was configured as part of this branch. Public probing is **not active** until a service-owner-approved URL is set. The connected Vercel project `carterscare-beta` is linked to `cdxidigital/carterscare-beta`, a different repository from this roadmap. Do not change its live source or domain without explicit verification and release approval.

The GitHub workflow is designed to run on the repository default branch once reviewed and merged. It does not run continually from a feature branch, automatically close dated checkpoints, or promote production without review.
