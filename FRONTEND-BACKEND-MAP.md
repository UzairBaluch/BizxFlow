# BizxFlow — Frontend vs Backend

Frontend: [BizxFlow-Frontend](https://github.com/UzairBaluch/BizxFlow-Frontend). Backend at `bizxflow-production.up.railway.app`.

---

## APIs the frontend actually calls (from `src/api/client.ts`)

| Frontend call | Backend route | Status |
|---------------|----------------|--------|
| `auth.register` | POST `/api/v1/users/register` | ✅ |
| `auth.login` | POST `/api/v1/users/login` | ✅ |
| `auth.logout` | POST `/api/v1/users/logout` | ✅ |
| `auth.me` | GET `/api/v1/users/me` | ✅ (added) |
| `users.updateProfile` | PATCH `/api/v1/users/update-profile` | ✅ |
| `users.changePassword` | PATCH `/api/v1/users/change-password` | ✅ |
| `users.all` | GET `/api/v1/users/all-users` | ✅ |
| `users.uploadProfilePicture` | POST `/api/v1/users/upload-profile-picture` | ⚠️ See note below |
| `attendance.checkIn` | POST `/api/v1/users/checkIn` | ✅ |
| `attendance.checkOut` | POST `/api/v1/users/checkOut` | ✅ |
| `attendance.myRecord` | GET `/api/v1/users/check-record` | ✅ |
| `attendance.allRecords` | GET `/api/v1/users/record-all` | ✅ |
| `tasks.list` | GET `/api/v1/users/tasks` | ✅ |
| `tasks.create` | POST `/api/v1/users/tasks` | ✅ |
| `tasks.update` | PATCH `/api/v1/users/tasks/:id` | ✅ |
| `leave.myLeaves` | GET `/api/v1/users/my-leaves` | ✅ |
| `leave.allLeaves` | GET `/api/v1/users/all-leaves` | ✅ |
| `leave.submit` | POST `/api/v1/users/submit-leave` | ✅ |
| `leave.update` | PATCH `/api/v1/users/leave/:id` | ❌ **Wrong path** |
| `dashboard.get` | GET `/api/v1/users/dashboard` | ✅ |

**Fix in frontend:** In [BizxFlow-Frontend](https://github.com/UzairBaluch/BizxFlow-Frontend) `src/api/client.ts`, change `leave.update` to use:

- **Correct path:** `PATCH /api/v1/users/update-leave/:leaveId`  
- Replace `api/v1/users/leave/${id}` with `api/v1/users/update-leave/${id}`.

**Profile picture:** Frontend calls `POST /upload-profile-picture` with `profilePicture`. Backend only has **PATCH /update-profile** with multipart field **`picture`**. Either use update-profile with field name `picture` for the file, or add a dedicated `POST /upload-profile-picture` route on the backend.

---

## ✅ Backend built (APIs used by frontend)

| Feature | Endpoints / behaviour |
|--------|------------------------|
| **Auth** | Register, Login, Logout, Me (JWT) |
| **Users** | List (search, pagination), Update profile, Change password, Upload profile picture |
| **Attendance** | Check-in, Check-out, My record, All records (admin) |
| **Tasks** | List (search, pagination), Create, Update (status, title, description, assignee) |
| **Leave** | My leaves, All leaves, Submit leave, Update leave (approve/reject) |
| **Dashboard** | Aggregates: total employees, tasks, leaves, today's attendance, tasks by status, leaves by status |

---

## ⚠️ UI only (no backend API yet)

These appear on the **landing page and/or dashboard** but have **no API** in the backend:

| Feature | Notes |
|--------|--------|
| **Meetings** | Scheduler, calendar, reminders — no meetings API |
| **Meeting notes** | AI summary → action items — no API |
| **Team chat** | Real-time channels/DMs — no chat/websocket API |
| **AI Daily Briefing** | Morning summary — no briefing API |
| **Notifications** | In-app + email alerts — no notifications API |
| **Community posts** | Team feed, post/create — no posts API |
| **Performance / Analytics** | Insights, scores — no analytics API (backend has basic counts only) |
| **Announcements** | Company-wide from admin — no announcements API |
| **Mood check-in** | Anonymous mood, manager trends — no mood API |
| **End-of-day report** | Submit + AI compile — no report API |
| **AI Workload balancer** | Overload detection — no API |
| **Natural language tasks** | “Remind X to…” — no NL API |
| **Global search** | Cross-resource search — only per-resource search in backend |

---

## Recommendation

**For “one project complete” and honest demos:**

1. **Ship the UI** with your domain. Use it to show the **full experience** of the product.
2. **In the UI:** For features that have no backend yet (Meetings, Chat, AI Briefing, etc.):
   - Either **hide or disable** those sections with a “Coming soon” or “Connect backend” note, **or**
   - Keep them as **mock/placeholder** and in interviews say: “This is the UI vision; backend is built for Auth, Users, Attendance, Tasks, Leave, and Dashboard.”
3. **Backend roadmap:** If you add new APIs later, start with 1–2 high-impact items, e.g.:
   - **Notifications** (in-app + email) — reuses existing events (task assigned, leave status).
   - **Announcements** — simple CRUD, admin-only create, everyone read.

This way the repo stays honest (no fake “working” features), and you have a clear list of what’s real vs planned.
