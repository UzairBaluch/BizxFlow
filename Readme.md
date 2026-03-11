# BizxFlow

A production-ready REST API for managing employees, attendance, tasks, and leaves — built with Node.js, Express, and MongoDB.

Designed for businesses that need role-based workforce management with real-time notifications and secure authentication.

---

## Live

| | URL |
|---|-----|
| **API** | https://bizxflow-production.up.railway.app |
| **API docs (Swagger)** | https://bizxflow-production.up.railway.app/api-docs |

---

## Features

- **Authentication** – Register, login, logout, refresh tokens, password reset via email
- **Role-Based Access Control** – Admin, Manager, Employee roles with protected routes
- **Attendance Tracking** – Check-in, check-out, view records by date range
- **Task Management** – Create and assign tasks, update status, email notifications
- **Leave Management** – Apply for leave, approve/reject workflow, email notifications
- **File Uploads** – Profile pictures via Cloudinary
- **Email Notifications** – Nodemailer on task assignment, leave submission, and password reset
- **Security** – JWT auth, bcrypt password hashing, helmet HTTP headers, rate limiting on auth routes
- **Request Logging** – morgan logs every request with method, route, status, and response time
- **Dashboard Analytics** – Real-time stats using MongoDB aggregation pipeline with parallel queries
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
| POST | `/api/v1/users/register` | Public |
| POST | `/api/v1/users/login` | Public |
| POST | `/api/v1/users/logout` | Auth |
| POST | `/api/v1/users/refresh-token` | Public |
| POST | `/api/v1/users/forgot-password` | Public |
| POST | `/api/v1/users/reset-password/:token` | Public |

### Attendance
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/v1/users/checkIn` | Employee |
| POST | `/api/v1/users/checkOut` | Employee |
| GET | `/api/v1/users/check-record` | Auth |
| GET | `/api/v1/users/record-all` | Admin/Manager |

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

### Users
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/all-users` | Admin |
| PATCH | `/api/v1/users/change-password` | Auth |
| PATCH | `/api/v1/users/update-profile` | Auth |

### Dashboard
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/v1/users/dashboard` | Admin/Manager |

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

**API docs (local):** [http://localhost:8000/api-docs](http://localhost:8000/api-docs) — try endpoints and use **Authorize** with a login token.

---

## Author

**[Uzair Baluch](https://github.com/UzairBaluch)** – Self-taught backend developer
