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
- **Users:** Get all (admin), update profile, change password
- **Dashboard:** Totals, tasks/leaves by status, today’s attendance (aggregations)
- **Search & pagination:** Tasks (title), Users (fullName)
- **Announcements:** Admin/Manager create, all auth users list (newest first)
- **API docs:** Swagger at `/api-docs`
- **Deploy:** Live on Railway

---

## 🟡 To build (backend) – from frontend gaps

Features the UI shows but have **no backend API yet**. Build these so frontend can connect.

| Feature | Notes |
|--------|--------|
| **Notifications** | In-app + email (task assigned, leave status, etc.) |
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

**Suggested order:** Notifications → then pick by priority (e.g. Meetings, Chat, Analytics).

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

- Organization / Company model
- Multi-tenancy (orgId on all models)
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
