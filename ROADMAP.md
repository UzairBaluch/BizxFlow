# BizxFlow – Roadmap (Active Only)

Only forward-looking work is kept here.

---

## Rule for every new backend feature (multi-tenancy)

1. Add required `companyId` in model (unless truly global).
2. Set `companyId` on create from `req.company?._id ?? req.user?.companyId`.
3. Filter/verify `companyId` on read, update, delete.
4. Enforce clear auth scope (Company JWT / Manager / Employee).
5. Validate cross-tenant refs (e.g. assignee/user belongs to same company).
6. Update Swagger when API contract is stable.

---

## To build next (backend)

| Priority | Feature | Notes |
|---|---|---|
| 1 | Meetings | Scheduler, calendar, reminders API |
| 2 | Team chat | Real-time channels/DM + history |
| 3 | Performance / Analytics | Insights API beyond current basic counts |
| 4 | Meeting notes | AI summary + action items (or CRUD first) |
| 5 | Community posts | Team feed create/list |
| 6 | Mood check-in | Anonymous mood + trend endpoints |
| 7 | End-of-day report | Submit + AI compile flow |
| 8 | AI Daily Briefing | Morning summary endpoint |
| 9 | AI Workload balancer | Overload detection API |
| 10 | Natural language tasks | NL command-to-task API |
| 11 | Global search | Cross-resource search endpoint |
| 12 | Notifications scale-out (optional) | Redis adapter + dedup |

---

## 🧱 Technology status (project)

### Currently used (already in project)

- Node.js + Express
- MongoDB + Mongoose
- JWT auth + bcrypt
- Socket.io
- Nodemailer
- Cloudinary + Multer
- Helmet + CORS + cookie-parser + rate limiting
- Swagger/OpenAPI docs
- Railway deploy

### Next stack to adopt (professional upgrade path)

#### Phase 1 (start now)
- TypeScript (incremental migration, `allowJs` first)
- Zod (request validation layer for body/params/query)
- Jest + Supertest (integration tests)
- GitHub Actions CI (`lint + test`)

#### Phase 2 (after Phase 1 is stable)
- Centralized env validation (`src/config/env.ts` pattern)
- Structured logger (`pino`) + request IDs
- Docker (local/prod parity)

#### Phase 3 (scale features)
- Redis (cache + pub/sub + Socket.io adapter)
- Background jobs (BullMQ) for reminders/emails
- PostgreSQL (for analytics/search-heavy relational queries, if needed)

#### Phase 4 (advanced/optional)
- Monorepo tooling (`pnpm` workspaces / Turbo)
- Observability stack (Sentry + metrics + tracing)
- API gateway / reverse proxy hardening

## 📅 Daily plan

Use this in parallel with job/bootcamp prep.

- **Coding time (2h/day):** implement only the coding task for that day.
- **Learning time (2h/day):** watch only the concept topics for that day.
- **Rule:** do not move to next day until coding task compiles and basic API test passes.

### A) Coding-time tasks (2h/day)

#### Week 1

| Day | Coding task |
|---|---|
| 1 | Add Zod request validation middleware baseline on one auth route |
| 2 | Add Zod schemas to add-user + register/login payloads |
| 3 | Add pagination cap helper and apply to 2 endpoints |
| 4 | Hash reset token flow (`forgot/reset`) |
| 5 | Replace sync file cleanup with safe async cleanup in Cloudinary util |
| 6 | Align status-code contracts on create endpoints |
| 7 | Catch-up/refactor day + docs update |

#### Week 2

| Day | Coding task |
|---|---|
| 8 | Add Jest config and first integration test scaffold |
| 9 | Add tests: login/refresh/logout (user + company) |
| 10 | Add tenant isolation tests (users/tasks/leaves) |
| 11 | Add role guard tests (company/manager/employee) |
| 12 | Add GitHub Actions CI (`lint + test`) |
| 13 | Create centralized env validation module |
| 14 | Add structured request logging with request-id |

#### Week 3

| Day | Coding task |
|---|---|
| 15 | Meetings API model + create/list endpoints (tenant-safe) |
| 16 | Meetings update/cancel + role guard rules |
| 17 | Meeting reminders job skeleton (cron/queue) |
| 18 | Team chat message model + REST history endpoint |
| 19 | Socket rooms for team chat (company/channel scoped) |
| 20 | Chat send/receive + persistence validation |
| 21 | Catch-up + API docs sync |

#### Week 4

| Day | Coding task |
|---|---|
| 22 | Community posts CRUD (tenant-safe) |
| 23 | AI Daily Briefing endpoint skeleton |
| 24 | End-of-day report submit/list API |
| 25 | Mood check-in API + manager trend summary endpoint |
| 26 | Performance/analytics endpoint v1 (company insights) |
| 27 | Global search endpoint v1 (users/tasks/leaves) |
| 28 | NL task parsing endpoint skeleton |

#### Week 5

| Day | Coding task |
|---|---|
| 29 | Audit logs model + middleware |
| 30 | Migration script convention + one example migration |
| 31 | Dockerize backend for local parity |
| 32 | Add Redis adapter plan for notifications/chat (optional) |
| 33 | Add CSV export endpoint for one domain |
| 34 | Ops runbook draft (`docs/OPERATIONS.md`) |
| 35 | Final QA + README/Swagger polish + roadmap review |

### B) Learning-time tasks (2h/day)

#### Week 1

| Day | Concept topics | YouTube keywords |
|---|---|---|
| 1 | TypeScript fundamentals, Zod basics | `typescript crash course backend`, `zod validation express tutorial` |
| 2 | Express middleware architecture, API validation patterns | `express middleware explained`, `node api validation best practices` |
| 3 | API pagination design, Defensive coding in Node.js | `rest api pagination design`, `defensive programming node js` |
| 4 | Password reset security, Cryptographic hashing (SHA-256) | `secure password reset flow nodejs`, `sha256 token hashing node` |
| 5 | Node.js fs async patterns, Error handling patterns | `node fs promises unlink`, `nodejs async error handling patterns` |
| 6 | REST API design, HTTP status code semantics | `rest api design best practices`, `http status codes explained backend` |
| 7 | Clean architecture basics, Refactoring strategy | `clean architecture nodejs`, `refactoring legacy code strategy` |

#### Week 2

| Day | Concept topics | YouTube keywords |
|---|---|---|
| 8 | Jest fundamentals, Supertest basics | `jest tutorial nodejs`, `supertest express api testing` |
| 9 | Integration testing strategy, Auth testing patterns | `integration testing express auth`, `jwt auth test cases` |
| 10 | Multi-tenancy backend design, Authorization boundaries | `multi tenant architecture backend`, `authorization boundaries api` |
| 11 | RBAC design, Negative test design | `rbac backend design`, `negative testing api` |
| 12 | GitHub Actions CI basics, Branch protection rules | `github actions node ci`, `github branch protection rules` |
| 13 | Environment config architecture, Fail-fast startup design | `node env validation`, `fail fast configuration pattern` |
| 14 | Structured logging, Correlation IDs | `structured logging nodejs`, `correlation id express middleware` |

#### Week 3

| Day | Concept topics | YouTube keywords |
|---|---|---|
| 15 | PostgreSQL fundamentals, Data modeling for scheduling | `postgresql tutorial for beginners`, `database schema design scheduling app` |
| 16 | SQL updates/constraints, Domain authorization patterns | `sql constraints explained`, `authorization patterns backend` |
| 17 | Background jobs, Scheduling systems | `nodejs background jobs`, `cron vs queue backend` |
| 18 | WebSocket fundamentals, Chat data modeling | `websocket basics nodejs`, `chat app database schema` |
| 19 | Socket.io rooms/events, Real-time architecture | `socket.io rooms tutorial`, `real time architecture backend` |
| 20 | Event-driven backend basics, Idempotency basics | `event driven architecture nodejs`, `idempotency api design` |
| 21 | OpenAPI/Swagger workflow, Contract-first API | `openapi swagger tutorial`, `contract first api design` |

#### Week 4

| Day | Concept topics | YouTube keywords |
|---|---|---|
| 22 | Feed system basics, CRUD API best practices | `social feed backend design`, `crud api best practices` |
| 23 | Prompt engineering basics, Summarization pipeline basics | `prompt engineering for developers`, `text summarization pipeline backend` |
| 24 | Report workflow design, Data validation design | `workflow design backend`, `data validation architecture` |
| 25 | Aggregation patterns, Privacy-aware analytics basics | `mongodb aggregation patterns`, `privacy by design analytics` |
| 26 | SQL aggregations, Query optimization (`EXPLAIN`) | `sql aggregate functions tutorial`, `postgres explain analyze` |
| 27 | Full-text search basics, Search relevance basics | `postgres full text search`, `search relevance ranking basics` |
| 28 | NLP intent extraction basics, Command parsing patterns | `nlp intent classification`, `command parser design` |

#### Week 5

| Day | Concept topics | YouTube keywords |
|---|---|---|
| 29 | Audit logging architecture, Compliance logging basics | `audit logging best practices`, `compliance logging backend` |
| 30 | DB migration strategy, Safe rollout patterns | `database migration strategy`, `safe deployment rollout backend` |
| 31 | Docker fundamentals, Container networking basics | `docker for nodejs beginners`, `docker networking explained` |
| 32 | Redis basics, Pub/Sub and cache patterns | `redis tutorial backend`, `redis pub sub cache aside pattern` |
| 33 | Streaming responses, CSV generation patterns | `nodejs stream tutorial`, `generate csv in nodejs` |
| 34 | Incident response basics, Rollback strategy | `incident response for developers`, `rollback strategy deployment` |
| 35 | System design recap, Junior interview backend Q&A | `backend system design basics`, `junior backend interview questions` |

**If a day spills over:** continue next day, do not skip sequence.

---

## Later (after core backlog)

- Slack / Discord alerts
- CSV exports
- Company onboarding flow
- Stripe subscription + billing
- Plan limits middleware
