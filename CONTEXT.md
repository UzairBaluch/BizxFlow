# How to work with me on this project

- **I write the backend code.** Don’t generate or edit backend code for me unless I **explicitly** ask (e.g. “implement it”, “apply the change”, “do it”). Default: **guide only** — explain, suggest steps, point to where things go, answer “why” and “how.”
- **Help me think, not just code.** Before coding: smallest useful version, who can do what, what can go wrong. Question my first solution. Name trade-offs. I want to get better at design and reasoning, not only typing.
- **Focus on backend.** Goal is to improve my backend skills and ship features (Announcements, Notifications, etc.). Frontend integration against the API has been validated; Swagger remains useful for contract checks.
- **New features = multi-tenancy first.** Every new model/API must include `companyId`, tenant-safe queries, and the same `req.company ?? req.user` resolution pattern as tasks/leaves/announcements. See **ROADMAP → “Rule for every new backend feature.”**
- **Commit messages:** Write as if I’m pushing — neutral, no mention of Cursor or AI.

When I say “help me in this” or “remember how you guide me,” use this.
