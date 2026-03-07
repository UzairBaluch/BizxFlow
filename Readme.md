# BizxFlow

A production-ready Employee Management System built with Node.js, Express, and MongoDB.

## Features

- Role-based access control (Admin, Manager, Employee)
- Attendance tracking (check-in, check-out, records)
- Task management (create, assign, update status)
- Leave management (apply, approve/reject, status workflow)
- Email notifications (leave status, task assignment)
- Password reset (secure token-based flow with auto-expiry)

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (Image uploads)
- Multer
- Nodemailer (Email)
- Crypto (Token generation)

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
| POST | `/api/v1/users/checkIn` | Auth |
| POST | `/api/v1/users/checkOut` | Auth |
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

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with the following variables:
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
EMAIL=
PASS=
```
4. Run `npm run dev`

## Author

Uzair Baloch
