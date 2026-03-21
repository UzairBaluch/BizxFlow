# BizxFlow

A production-ready REST API for managing employees, attendance, tasks, and leaves — built with Node.js, Express, and MongoDB.

Designed for businesses that need role-based workforce management with real-time notifications and secure authentication.

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

This repo is the **backend API**; the frontend consumes it for auth, dashboard, tasks, leave, attendance, and users.

---

## Features

- **Company-based auth** – Sign up creates a **company** (email, password, company name, optional logo). One **login** for company or user; response includes `type: "company"` or `"user"`. Company can update itself (name, logo), change password, and list users in its company. Users are added by company or Admin/Manager via add-user. **Multi-tenancy:** Users and add-user are scoped by company; attendance, leave, tasks, announcements, and dashboard counts are scoped by `companyId` (see Roadmap).
- **Authentication** – Register (company), login (company or user), logout, refresh tokens, password reset via email
- **Role-Based Access Control** – Admin, Manager, Employee roles for **users**; company is a separate account type with protected routes
- **Attendance Tracking** – Check-in, check-out, view records by date range
- **Task Management** – Create and assign tasks, update status, email notifications
- **Leave Management** – Apply for leave, approve/reject workflow, email notifications
- **File Uploads** – Profile pictures via Cloudinary
- **Email Notifications** – Nodemailer on task assignment, leave submission, and password reset
- **Security** – JWT auth, bcrypt password hashing, helmet HTTP headers, rate limiting on auth routes
- **Request Logging** – morgan logs every request with method, route, status, and response time
- **Dashboard Analytics** – Real-time stats using MongoDB aggregation pipeline with parallel queries
- **Announcements** – Admin/Manager create company-wide announcements; any authenticated user can list (newest first)
- **Search & Pagination** – Filter tasks by title, users by name, with page/limit controls
- **API Documentation** – Interactive Swagger UI at `/api-docs` with JWT (Bearer) auth

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

---

## Project Structure

```
src/
├── controllers/       # Route handlers
├── middlewares/       # Auth and file upload middleware
├── models/            # Mongoose schemas
├── routes/            # Express routes
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
| POST | `/api/v1/users/checkIn` | Employee |
| POST | `/api/v1/users/checkOut` | Employee |
| GET | `/api/v1/users/check-record` | Auth |
| GET | `/api/v1/users/record-all` | Company or Admin/Manager |

### Tasks
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/tasks` | Admin/Manager |
| GET | `/api/v1/users/tasks` | Auth |
| PATCH | `/api/v1/users/tasks/:id` | Auth |

### Leave
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/submit-leave` | Auth |
| PATCH | `/api/v1/users/update-leave/:leaveId` | Admin/Manager |
| GET | `/api/v1/users/all-leaves` | Admin/Manager |
| GET | `/api/v1/users/my-leaves` | Auth |

### Company (company account only)
| Method | Endpoint | Access |
|--------|----------|--------|
| PATCH | `/api/v1/users/company` | Company (update name, logo) |

### Users
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/all-users` | Company or Admin/Manager (scoped by company) |
| POST | `/api/v1/users/add-user` | Company or Admin/Manager (body: fullName, email, password, role; optional picture) |
| PATCH | `/api/v1/users/change-password` | Auth (company or user) |
| PATCH | `/api/v1/users/update-profile` | User only |

### Dashboard
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/dashboard` | Admin/Manager |

### Announcements
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/announcements` | Admin/Manager |
| GET | `/api/v1/users/announcements` | Auth |

---

## Roadmap

- **Multi-tenancy** – Tasks, leave, attendance, announcements, and dashboard are scoped by `companyId`. Next: new features (notifications, etc.).
- **Next features** – Notifications (in-app + email), then Meetings, Team chat, Analytics, and others. See [ROADMAP.md](ROADMAP.md) for the full list.

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
```

### Run

```bash
npm run dev
```

Server starts at `http://localhost:8000`

**API docs:** [Live](https://bizxflow-production.up.railway.app/api-docs) · [Local](http://localhost:8000/api-docs) — use **Authorize** with `Bearer <accessToken>` from `POST /api/v1/users/login` (`data.accessToken`). Raw OpenAPI JSON: `/api-docs.json` (import into Postman, Insomnia, or codegen).

**Frontend:** Use **Swagger** (`/api-docs`, `/api-docs.json`) for contracts; see **ROADMAP.md** for what is shipped vs planned.

---

## Author

**[Uzair Baluch](https://github.com/UzairBaluch)** – Self-taught backend developer
