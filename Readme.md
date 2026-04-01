# BizxFlow

A REST API for workforce management: **company signup**, **employees** (Manager / Employee), **tasks**, **leave**, **attendance**, **dashboard**, **announcements**, and **in-app notifications** (REST + Socket.io). Built with Node.js, Express, and MongoDB.

**Version 1** of this backend is **feature-complete** for that scope. Suitable as a portfolio / full-stack backend paired with the [frontend repo](#frontend-full-stack).

---

## Live

| | URL |
|---|-----|
| **API** | [https://bizxflow-production.up.railway.app](https://bizxflow-production.up.railway.app) |
| **API docs (Swagger)** | [https://bizxflow-production.up.railway.app/api-docs](https://bizxflow-production.up.railway.app/api-docs) |
| **Health** | [https://bizxflow-production.up.railway.app/health](https://bizxflow-production.up.railway.app/health) |

**Try it:** Open [API docs](https://bizxflow-production.up.railway.app/api-docs) → **Authorize** with a token from `/login` → run any endpoint.

### Frontend (full-stack)

| | Link |
|---|-----|
| **Repo** | [BizxFlow-Frontend](https://github.com/UzairBaluch/BizxFlow-Frontend) — React + TypeScript + Vite, Tailwind, Zustand |
| **App** | _Deploy with your domain (Vercel/Netlify); set `VITE_API_BASE_URL` to the API URL above_ |
| **Status** | Integration testing against this API completed for shipped endpoints |

This repo is the **backend API**; the frontend consumes it for auth, dashboard, tasks, leave, attendance, and users.

---

## Features

- **Company-based auth** – Sign up creates a **company** (email, password, company name, optional logo). One **login** for company or user; response includes `type: "company"` or `"user"`. The **company** account is the org owner (full access). **Manager** users share most org operations (dashboard, users, tasks, leaves, announcements, **company-wide** attendance via `record-all`); **Employee** self-service (`checkIn`, `checkOut`, `check-record`). New staff are added via **add-user**. Tenant data is scoped by **`companyId`** on create, read, update, and delete.
- **Authentication** – Register (company), login (company or user), logout, refresh tokens, password reset via email
- **Role-Based Access Control** – **User** accounts are **Manager** or **Employee** only. **Company** is a separate account type (signup), not a user role.
- **Attendance Tracking** – Check-in, check-out, view records by date range
- **Task Management** – Create and assign tasks, update status, email notifications
- **Leave Management** – Apply for leave, approve/reject workflow, email notifications
- **File Uploads** – Profile pictures via Cloudinary
- **Email Notifications** – Nodemailer on task assignment, leave submission, and password reset
- **Security** – JWT auth, bcrypt password hashing, helmet HTTP headers, rate limiting on auth routes
- **Request Logging** – morgan logs every request with method, route, status, and response time
- **Dashboard Analytics** – Real-time stats using MongoDB aggregation pipeline with parallel queries
- **Announcements** – Company or Manager create company-wide announcements; any authenticated user can list (newest first)
- **Search & pagination** – Tasks and users lists support `page` and `limit` plus optional search; **`limit` is capped at 100** (default 10)
- **API Documentation** – Interactive Swagger UI at `/api-docs` with JWT (Bearer) auth
- **In-app notifications** – REST + Socket.io (`notification` event): **user** JWT (`/my-notifications`, …) and **company** JWT (`/company-notifications`, …). Triggered by tasks, leave workflow, announcements, attendance check-in/out (see endpoint section below)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| File Upload | Cloudinary + Multer |
| Email | Nodemailer (Gmail SMTP) |
| Token Generation | Node.js crypto |
| Security | helmet + express-rate-limit |
| Logging | morgan |
| Real-time | Socket.io (notification pushes) |

---

## Project Structure

```
src/
├── controllers/       # Route handlers
├── middlewares/       # Auth and file upload middleware
├── models/            # Mongoose schemas
├── routes/            # Express routes
├── socket/            # Socket.io (auth + notification emits)
└── utils/             # Helper functions (ApiError, ApiResponse, sendEmail, etc.)
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/register` | Public (company signup: email, password, companyName, optional logo) |
| POST | `/api/v1/users/login` | Public (returns company or user + `type`) |
| POST | `/api/v1/users/logout` | Auth (company or user) |
| GET | `/api/v1/users/me` | Auth (returns company or user + `type`) |
| POST | `/api/v1/users/refresh-token` | Public |
| POST | `/api/v1/users/forgot-password` | Public |
| POST | `/api/v1/users/reset-password/:token` | Public |

### Attendance
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/checkIn` | Employee user only (not company JWT) |
| POST | `/api/v1/users/checkOut` | Employee user only (not company JWT) |
| GET | `/api/v1/users/check-record` | User only — own records (not company JWT) |
| GET | `/api/v1/users/record-all` | Company JWT or Manager user |

### Tasks
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/tasks` | Company JWT or Manager user |
| GET | `/api/v1/users/tasks` | User — tasks assigned to me |
| GET | `/api/v1/users/all-tasks` | Company JWT or Manager user — all tasks in company (paginated) |
| PATCH | `/api/v1/users/tasks/:id` | Assignee (user) |

### Leave
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/submit-leave` | Auth |
| PATCH | `/api/v1/users/update-leave/:leaveId` | Company JWT or Manager user |
| GET | `/api/v1/users/all-leaves` | Company JWT or Manager user |
| GET | `/api/v1/users/my-leaves` | Auth |

### Company (company account only)
| Method | Endpoint | Access |
|--------|----------|--------|
| PATCH | `/api/v1/users/company` | Company (update name, logo) |

### Users
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/all-users` | Company JWT or Manager user (scoped by company) |
| POST | `/api/v1/users/add-user` | Company JWT or Manager user (body: fullName, email, password, role `Manager` \| `Employee`; optional picture) |
| PATCH | `/api/v1/users/update-user-role/:userId` | Company JWT or Manager user — JSON `{ "role": "Manager" \| "Employee" }` |
| DELETE | `/api/v1/users/delete-user/:userId` | Company JWT or Manager user — hard delete; guards for self and last Manager |
| PATCH | `/api/v1/users/change-password` | Auth (company or user) |
| PATCH | `/api/v1/users/update-profile` | User only |

### Dashboard
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/dashboard` | Company JWT or Manager user |

### Announcements
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/announcements` | Company JWT or Manager user (**201 Created**) |
| GET | `/api/v1/users/announcements` | Auth — full list for company, newest first (not paginated) |

### Notifications (in-app)

Paginated routes (`my-notifications`, `company-notifications`) use `page` and `limit` with the same **max `limit` of 100** as tasks and users.

**User JWT**

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/my-notifications` | User — `page`, `limit`, optional `read` |
| GET | `/api/v1/users/unread-count` | User — `{ unreadCount }` |
| PATCH | `/api/v1/users/my-notifications/read-all` | User |
| PATCH | `/api/v1/users/my-notifications/:notificationId/read` | User |

**Company JWT** (org owner inbox; rows use `recipientCompany`)

| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/company-notifications` | Company — same query shape as above |
| GET | `/api/v1/users/company-notifications/unread-count` | Company |
| PATCH | `/api/v1/users/company-notifications/read-all` | Company |
| PATCH | `/api/v1/users/company-notifications/:notificationId/read` | Company |

Rows are created for: **task assigned** (assignee + company inbox + Manager users, same org-wide copy; assigning Manager skipped from duplicate manager row); **task status updated** (company + Managers; updater skipped if Manager); **leave submitted** (company + Managers via one helper; submitter skipped if Manager); **leave approved/rejected** (employee); **announcement** (all users except poster on user JWT); **check-in / check-out** (company + Managers).

**Socket.io:** Same base URL; `auth.token` = user **or** company access token; event **`notification`**. See `/api-docs` API description.

---

## Scope

**Shipped in V1** — Auth (register, login, refresh, password reset), users and roles, tasks, leave, attendance, dashboard, announcements, in-app notifications (REST + Socket.io), file uploads, Swagger, deployed API.

**Multi-tenancy** — New tenant-scoped resources should include `companyId`, set it on create from the authenticated company or user, filter or verify it on reads/updates/deletes, and validate related user ids belong to the same company (follow patterns in existing controllers).

**Not built here** — Examples: meetings, team chat, billing, advanced analytics (optional extensions for a separate project or fork).

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password enabled

### Installation

```bash
git clone https://github.com/UzairBaluch/BizxFlow.git
cd BizxFlow
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```
PORT=8000
MONGODB_URI=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d
CORS_ORIGIN=*
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
PASSWORD_RESET_URL_BASE=https://your-frontend-host/path-to-reset-page
```

`PASSWORD_RESET_URL_BASE` — no trailing slash; reset emails link to `{PASSWORD_RESET_URL_BASE}/{token}`.

### Run

```bash
npm run dev
```

Server starts at `http://localhost:8000`

**API docs:** [Live](https://bizxflow-production.up.railway.app/api-docs) · [Local](http://localhost:8000/api-docs) — use **Authorize** with `Bearer <accessToken>` from `POST /api/v1/users/login` (`data.accessToken`). Raw OpenAPI JSON: `/api-docs.json` (import into Postman, Insomnia, or codegen).

**Frontend:** Use **Swagger** (`/api-docs`, `/api-docs.json`) for REST contracts. If you have **[docs/FRONTEND-SOCKET.md](docs/FRONTEND-SOCKET.md)** locally, it describes Socket.io for notifications.

---

## Author

**[Uzair Baluch](https://github.com/UzairBaluch)** – Self-taught backend developer
