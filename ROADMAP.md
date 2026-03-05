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
3. **Real-time group chat** – Socket.io, rooms, message history
4. **Dashboard analytics** – MongoDB aggregation, stats
5. **Search & pagination** – Tasks, users, attendance filters
6. **Rate limiting** – express-rate-limit on auth routes
7. **API documentation** – Swagger/OpenAPI
8. **Audit logs** – Track who did what
9. **Scheduled jobs** – node-cron (reminders, reports)
10. **Video meetings** – Daily.co or Twilio integration

---

## Later (optimization phase)

- DB indexes
- Unit tests (Jest)
- Deployment
- Password reset flow
