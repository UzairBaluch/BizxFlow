# BizxFlow – Roadmap

**Backend:** `bizxflow-production.up.railway.app` · **Frontend:** [BizxFlow-Frontend](https://github.com/UzairBaluch/BizxFlow-Frontend)

---

## ✅ Done

- **Auth:** Register, login, logout, access + refresh token (HTTP-only cookies), password reset
- **Roles:** Admin, Manager, Employee with role checks on routes
- **Attendance:** Check-in/out, daily records, compound unique index
- **Tasks:** Create, assign, update status, email on assignment
- **Leave:** Apply, approve/reject, email on submit and status change
- **File upload:** Profile picture via Cloudinary + Multer
- **Security:** Helmet, rate limiting on auth, Morgan logging
- **Users:** List users (company or Admin/Manager, tenant-scoped), update profile, change password
- **Dashboard:** Totals, tasks/leaves by status, today’s attendance (aggregations)
- **Search & pagination:** Tasks (title), Users (fullName)
- **Announcements:** Company or Admin/Manager create; list scoped by company (newest first)
- **Notifications (REST):** `Notification` model; `GET /my-notifications`, `GET /unread-count`, `PATCH /my-notifications/read-all`, `PATCH /my-notifications/:notificationId/read` — **user JWT**, tenant-scoped (`companyId` + `recipient`). **Next:** create rows from domain events (tasks/leave/announcements), optional Socket.io fan-out, align with existing emails where needed
- **API docs:** Swagger at `/api-docs`
- **Deploy:** Live on Railway
- **Frontend integration:** [BizxFlow-Frontend](https://github.com/UzairBaluch/BizxFlow-Frontend) exercised against this API; core flows validated
- **Company-based auth:** Register company, unified login (company or user), getMe/logout/change-password, update company. **Company vs attendance:** company JWT can use org features (incl. `record-all`, dashboard) but **not** `checkIn` / `checkOut` / `check-record` (employee self-service only).
- **Add user:** Company or Admin/Manager add users (fullName, email, password, role; optional picture)
- **Multi-tenancy:** Attendance, leave, tasks, announcements, dashboard, all-users, and add-user scoped by `companyId` (see checklist below)

---

## ✅ Multi-tenancy – scope by company (complete)

Data isolation: each company only sees its own records via `companyId` on models and filtered queries.

- [x] **Attendance** – `companyId` on model; set on check-in; `record-all` filtered by company (Company or Admin/Manager)
- [x] **Leave** – `companyId` on model; submit/review/list flows tenant-safe
- [x] **Task** – `companyId` on create; assignee same company; my-tasks filtered by company
- [x] **Announcements** – `companyId` on create; list filtered by company
- [x] **Dashboard** – Counts scoped by `companyId` (Company JWT or Admin/Manager user JWT)

**Note:** Older DB rows without `companyId` may need a one-time migration before strict production use.

---

## 🔒 Rule for every new backend feature (multi-tenancy)

**Do not ship a new domain without tenant isolation.** When you add Notifications, Meetings, Chat, etc.:

1. **Model** – Add `companyId` (ref `Company`, required unless truly global).
2. **Create** – Set `companyId` from `req.company?._id ?? req.user?.companyId` (same pattern as tasks/leaves/announcements).
3. **Read / list / update / delete** – Filter or verify `companyId` **before** returning or mutating data (use `.toString()` for comparisons).
4. **Auth** – Decide if the action is allowed for **company JWT**, **Admin/Manager**, **Employee**, or a combo; mirror existing controllers.
5. **Cross-tenant links** – Any `userId` / foreign key must belong to the same `companyId` (validate like task `assignedTo`).
6. **Docs** – Update Swagger (`src/docs/*.paths.js`, `src/config/swagger.js`) when the API is stable.

Use **attendance**, **leave**, **task**, and **announcement** controllers as templates.

---

## 🟡 To build (backend) – from frontend gaps

Features the UI shows but have **no backend API yet**. Build these so frontend can connect — **apply the multi-tenancy rule above to each.**

| Feature | Notes |
|--------|--------|
| **Notifications** | **REST + persistence done.** Remaining: auto-create on events, optional Socket.io, optional email dedup vs existing `sendMail` |
| **Meetings** | Scheduler, calendar, reminders — meetings API |
| **Meeting notes** | AI summary → action items (or simple CRUD first) |
| **Team chat** | Real-time channels/DMs — Socket.io rooms + message history |
| **AI Daily Briefing** | Morning summary — briefing API |
| **Community posts** | Team feed, post/create — posts API |
| **Performance / Analytics** | Insights, scores — analytics API (backend has basic counts) |
| **Mood check-in** | Anonymous mood, manager trends — mood API |
| **End-of-day report** | Submit + AI compile — report API |
| **AI Workload balancer** | Overload detection — API |
| **Natural language tasks** | “Remind X to…” — NL API |
| **Global search** | Cross-resource search (tasks, users, leaves, etc.) |

**Suggested order:** **Notifications** (tenant-scoped) → then by priority (e.g. Meetings, Chat, Analytics) — each with `companyId` + filters from day one.

---

## 🟡 Core (from original roadmap)

- Real-time notifications (Socket.io)
- Scheduled email reports (node-cron)
- Audit logs (who did what, when)

---

## 🟢 Advanced

- Real-time group chat (Socket.io rooms + history)
- Slack / Discord alert integration
- CSV exports (attendance, tasks, leave reports)

---

## ⚙️ Optimization

- DB indexes + performance tuning
- Unit tests (Jest)
- TypeScript conversion
- Docker + CI/CD

---

## 💡 Maybe later

- Company onboarding flow
- Stripe subscription + billing
- Plan limits enforcement middleware

---

## 🚀 Hireable checklist

- [x] Deploy to Railway (live URL)
- [x] Swagger at `/api-docs`
- [x] README with live URL and setup
- [x] Dashboard analytics (aggregation)
- [x] Search + pagination on at least one resource
- [ ] Core / to-build items completed as needed
