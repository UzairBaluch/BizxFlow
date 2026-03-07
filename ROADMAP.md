# BizxFlow – Feature Roadmap

Tackle one by one, in this order.

---

## Done ✓

- [x] Auth (register, login, logout, refresh token)
- [x] Roles (Admin, Manager, Employee)
- [x] Attendance (checkIn, checkOut, records)
- [x] Tasks (create, assign, update status)
- [x] File upload (Cloudinary, Multer)

---

## To Do

1. ~~**Leave management** – Apply, approve/reject, status workflow~~ ✓
2. ~~**Email notifications** – Nodemailer (leave approved, task assigned)~~ ✓
3. ~~**Password reset** – Forgot password, token, reset via email~~ ✓
4. **Real-time group chat** – Socket.io, rooms, message history
5. **Dashboard analytics** – MongoDB aggregation, stats
6. **Search & pagination** – Tasks, users, attendance filters
7. **Rate limiting** – express-rate-limit on auth routes
8. **API documentation** – Swagger/OpenAPI
9. **Audit logs** – Track who did what
10. **Scheduled jobs** – node-cron (reminders, reports)
11. **Video meetings** – Daily.co or Twilio integration

---

## Later (optimization phase)

- DB indexes
- Unit tests (Jest)
- TypeScript conversion
- Deployment
