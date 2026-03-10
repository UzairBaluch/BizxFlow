# BizxFlow – Features

---

## ✅ Done

### Authentication
- Register, login, logout
- Access token + refresh token (HTTP-only cookies)
- Password reset via email (token-based)

### Roles & Access Control
- Role-based access: Admin, Manager, Employee
- Role checks on all protected routes

### Attendance
- Check-in / check-out per employee
- Daily attendance records
- Compound unique index (user + date) prevents duplicate records

### Task Management
- Create and assign tasks
- Update task status
- Email notification on assignment

### Leave Management
- Apply for leave
- Approve / reject workflow (Admin/Manager)
- Email notification on submission and status change

### File Upload
- Profile picture upload via Cloudinary + Multer

### Security & Logging
- Helmet security headers
- Rate limiting on auth routes
- Morgan request logging

### User Management
- Get all users (Admin only)
- Update profile (name + profile picture)
- Change password (verify current, set new)

### Dashboard Analytics
- Total employees, tasks, leaves, today's attendance
- Tasks and leaves grouped by status (MongoDB aggregation)
- All queries run in parallel with Promise.all

### Search & Pagination
- Tasks: search by title, paginate with page/limit, returns totalTasks
- Users: search by fullName, paginate with page/limit, returns totalUsers

### API Documentation
- Swagger / OpenAPI at `/api-docs` with Bearer (JWT) auth

---

## 🟡 Core Features
- Real-time notifications (Socket.io)
- Scheduled email reports (node-cron)
- Audit logs (who did what and when)

---

## 🟢 Advanced

- Real-time group chat (Socket.io rooms + message history)
- Slack / Discord alert integration
- CSV exports (attendance, tasks, leave reports)

---

## ⚙️ Optimization

- DB indexes + performance tuning
- Unit tests (Jest)
- TypeScript conversion
- Docker + CI/CD
- Deployment

---

## 💡 Maybe Later (if no job by August)

- Organization / Company model
- Multi-tenancy (orgId on all models)
- Company onboarding flow
- Stripe subscription + billing
- Plan limits enforcement middleware

---

## 🚀 Hireable Checklist (must complete before applying)

- [ ] Deploy to Railway or Render (live URL is non-negotiable)
- [x] Swagger / OpenAPI docs live at `/api-docs`
- [x] README with live URL, API docs link, and setup instructions
- [x] Dashboard analytics working (proves MongoDB aggregation skill)
- [x] Search + pagination on at least one resource (proves production thinking)
- [ ] All In Progress items completed
