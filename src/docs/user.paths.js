/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a company (signup)
 *     description: Public. Creates the company account; no JWT required.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [email, password, companyName]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *               companyName: { type: string }
 *               logo: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Company created (standard ApiResponse wrapper)
 *       400:
 *         description: Validation error or email already exists
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login (company or user)
 *     description: Same email/password for company signup or employee. Response data.type is company or user; includes company or user object and tokens.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful (ApiResponse with data.type, tokens, company or user)
 *       400:
 *         description: Missing fields or no user for email
 *       401:
 *         description: Wrong password
 */

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout (clears cookies on server response)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Logged out }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Current session (company or user)
 *     description: "Returns data.type and either data.company or data.user."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current account
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200: { description: New tokens issued }
 *       401: { description: Invalid refresh token }
 */

/**
 * @swagger
 * /api/v1/users/checkIn:
 *   post:
 *     summary: Check in (Employee only)
 *     description: No body. One check-in per user per calendar day; duplicate returns 409.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Checked in }
 *       401: { description: Unauthorized }
 *       403: { description: Not an Employee, missing company, or company JWT (no check-in) }
 *       409: { description: Already checked in today }
 */

/**
 * @swagger
 * /api/v1/users/checkOut:
 *   post:
 *     summary: Check out (Employee only)
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Checked out }
 *       401: { description: Unauthorized }
 *       403: { description: Not an Employee, missing company, or company JWT }
 *       404: { description: No check-in for today }
 *       409: { description: Already checked out }
 */

/**
 * @swagger
 * /api/v1/users/check-record:
 *   get:
 *     summary: My attendance in a date range
 *     description: "User JWT only (employee history). Company JWT not allowed — use record-all."
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *         description: Range start (see server date helper)
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *         description: Range end
 *     responses:
 *       200: { description: List of attendance documents }
 *       401: { description: Unauthorized }
 *       403: { description: Missing company, or company JWT }
 */

/**
 * @swagger
 * /api/v1/users/record-all:
 *   get:
 *     summary: All company attendance in range
 *     description: "Company JWT or Manager user. Filtered by tenant companyId."
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string }
 *       - in: query
 *         name: to
 *         schema: { type: string }
 *     responses:
 *       200: { description: Attendance rows with populated user }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden (not Company or Manager user) }
 */

/**
 * @swagger
 * /api/v1/users/tasks:
 *   get:
 *     summary: My assigned tasks (paginated)
 *     description: "User token only. Query params optional. Scoped by companyId."
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Case-insensitive title filter
 *     responses:
 *       200:
 *         description: "{ tasks, totalTasks, page, limit }"
 *       401: { description: Unauthorized }
 *       403: { description: Missing company }
 *   post:
 *     summary: Create task
 *     description: Company JWT or Manager user. assignedTo must be a user id in the same company.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, assignedTo]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               assignedTo: { type: string, description: Mongo ObjectId of user }
 *               dueDate: { type: string, format: date-time }
 *     responses:
 *       201: { description: Task created }
 *       400: { description: Validation / invalid assignee / bad date }
 *       401: { description: Unauthorized }
 *       403: { description: Not Company or Manager user or assignee wrong company }
 */

/**
 * @swagger
 * /api/v1/users/all-tasks:
 *   get:
 *     summary: All company tasks (paginated)
 *     description: "Company JWT or Manager user. Same data shape as GET /tasks (tasks, totalTasks, page, limit). Optional status filter."
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Case-insensitive title filter
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [Pending, "In Progress", Done] }
 *         description: Optional exact status filter
 *     responses:
 *       200:
 *         description: "{ tasks, totalTasks, page, limit } (tasks may include populated assignedTo, createdBy, createdByCompany)"
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden (not Company or Manager user) }
 */

/**
 * @swagger
 * /api/v1/users/tasks/{id}:
 *   patch:
 *     summary: Update task status (assignee only)
 *     description: Status must be one of Pending, In Progress, Done. Task must belong to your company.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, "In Progress", Done]
 *     responses:
 *       200: { description: Updated task }
 *       400: { description: Missing/invalid status }
 *       401: { description: Unauthorized }
 *       403: { description: Not assignee or wrong tenant }
 *       404: { description: Task not found }
 */

/**
 * @swagger
 * /api/v1/users/submit-leave:
 *   post:
 *     summary: Submit leave request
 *     description: "Authenticated user (not company account). Requires companyId on user."
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [leaveType, startDate, endDate]
 *             properties:
 *               leaveType: { type: string, enum: [Sick, Casual, Annual] }
 *               startDate: { type: string, format: date }
 *               endDate: { type: string, format: date }
 *               reason: { type: string }
 *     responses:
 *       200: { description: Leave created }
 *       400: { description: Validation error }
 *       401: { description: Unauthorized }
 *       403: { description: Missing company }
 */

/**
 * @swagger
 * /api/v1/users/update-leave/{leaveId}:
 *   patch:
 *     summary: Approve or reject leave
 *     description: "Company JWT or Manager user. Same-tenant only."
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: leaveId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [Approved, Rejected] }
 *     responses:
 *       200: { description: Updated leave }
 *       400: { description: Invalid status or already reviewed }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden or wrong company }
 *       404: { description: Leave not found }
 */

/**
 * @swagger
 * /api/v1/users/my-leaves:
 *   get:
 *     summary: My leave requests
 *     description: "User token only."
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Array of leaves }
 *       401: { description: Unauthorized }
 *       403: { description: Missing company }
 */

/**
 * @swagger
 * /api/v1/users/all-leaves:
 *   get:
 *     summary: All leaves for the company
 *     description: "Company JWT or Manager user."
 *     tags: [Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Leaves with populated employee }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 */

/**
 * @swagger
 * /api/v1/users/forgot-password:
 *   post:
 *     summary: Request password reset email
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: If account exists, email sent }
 *       400: { description: User not found }
 */

/**
 * @swagger
 * /api/v1/users/reset-password/{token}:
 *   post:
 *     summary: Reset password with emailed token
 *     tags: [Auth]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [newPassword]
 *             properties:
 *               newPassword: { type: string }
 *     responses:
 *       200: { description: Password reset }
 *       400: { description: Invalid token }
 */

/**
 * @swagger
 * /api/v1/users/all-users:
 *   get:
 *     summary: List users in your company
 *     description: "Company JWT or Manager user. Supports pagination and search."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Filter by fullName (case-insensitive)
 *     responses:
 *       200:
 *         description: "{ users, totalUsers, page, limit }"
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden (e.g. Employee) }
 */

/**
 * @swagger
 * /api/v1/users/add-user:
 *   post:
 *     summary: Add employee to your company
 *     description: "Company JWT or Manager user. multipart body."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [fullName, email, password, role]
 *             properties:
 *               fullName: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string }
 *               role: { type: string, enum: [Manager, Employee] }
 *               picture: { type: string, format: binary }
 *     responses:
 *       201: { description: User added }
 *       400: { description: Validation or duplicate email }
 *       401: { description: Unauthorized }
 *       403: { description: Not Company or Manager user }
 */

/**
 * @swagger
 * /api/v1/users/update-user-role/{userId}:
 *   patch:
 *     summary: Update a user role (directory management)
 *     description: "Company JWT or Manager user. Tenant-scoped. Cannot change own role; cannot demote last Manager."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [Manager, Employee]
 *     responses:
 *       200: { description: Updated user (no password fields) }
 *       400: { description: Invalid id or role }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden, own role, or last Manager guard }
 *       404: { description: User not found in tenant }
 */

/**
 * @swagger
 * /api/v1/users/delete-user/{userId}:
 *   delete:
 *     summary: Remove a user from the company (hard delete)
 *     description: "Company JWT or Manager user. Cannot delete self; cannot delete last Manager."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: "{ deleted: true } in data" }
 *       400: { description: Invalid user id }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden, self-delete, or last Manager }
 *       404: { description: User not found in tenant }
 */

/**
 * @swagger
 * /api/v1/users/company:
 *   patch:
 *     summary: Update company profile (company login only)
 *     description: "Requires Company JWT. Optional companyName and/or logo file."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               companyName: { type: string }
 *               logo: { type: string, format: binary }
 *     responses:
 *       200: { description: Updated company }
 *       401: { description: Unauthorized }
 *       403: { description: Not a company account }
 */

/**
 * @swagger
 * /api/v1/users/change-password:
 *   patch:
 *     summary: Change password (company or user)
 *     description: "Uses currentPassword and newPassword (min length enforced server-side)."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword: { type: string }
 *               newPassword: { type: string }
 *     responses:
 *       200: { description: Password changed }
 *       400: { description: Wrong current password or weak new password }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/update-profile:
 *   patch:
 *     summary: Update user profile
 *     description: "User account only (not company). Optional fullName and/or picture."
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName: { type: string }
 *               picture: { type: string, format: binary }
 *     responses:
 *       200: { description: Profile updated }
 *       401: { description: Unauthorized }
 *       403: { description: Company accounts cannot use this route }
 */

/**
 * @swagger
 * /api/v1/users/dashboard:
 *   get:
 *     summary: Dashboard KPIs
 *     description: "Company JWT or Manager user JWT. Same aggregates scoped to that companyId."
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: data includes totalEmployees, totalTasks, tasksByStatus, totalLeaves, leaveByStatus, todayAttendance
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden (not Company JWT and not Manager user) }
 */

/**
 * @swagger
 * /api/v1/users/my-notifications:
 *   get:
 *     summary: List my notifications (paginated)
 *     description: "User JWT only. Filter by read=true or read=false. Scoped by companyId and recipient. When online, new items may arrive via Socket.io event `notification` (same document shape)."
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: read
 *         schema: { type: string, enum: ["true", "false"] }
 *         description: Optional unread-only or read-only filter
 *     responses:
 *       200:
 *         description: "{ notifications, totalNotifications, page, limit }"
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden (e.g. company JWT or missing companyId) }
 */

/**
 * @swagger
 * /api/v1/users/unread-count:
 *   get:
 *     summary: Unread notification count (badge)
 *     description: "User JWT only."
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ unreadCount } in data"
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 */

/**
 * @swagger
 * /api/v1/users/my-notifications/read-all:
 *   patch:
 *     summary: Mark all my notifications as read
 *     description: "User JWT only."
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ modifiedCount } in data"
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 */

/**
 * @swagger
 * /api/v1/users/my-notifications/{notificationId}/read:
 *   patch:
 *     summary: Mark one notification as read
 *     description: "User JWT only. Must belong to caller as recipient and tenant."
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Updated notification document }
 *       400: { description: Invalid notification id }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden }
 *       404: { description: Not found or not yours }
 */

/**
 * @swagger
 * /api/v1/users/company-notifications:
 *   get:
 *     summary: List company account notifications (paginated)
 *     description: "Company JWT only. Rows where recipientCompany matches this company. Socket.io accepts company access token and joins room company:<id>."
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: read
 *         schema: { type: string, enum: ["true", "false"] }
 *     responses:
 *       200:
 *         description: "{ notifications, totalNotifications, page, limit }"
 *       403: { description: Not company JWT }
 */

/**
 * @swagger
 * /api/v1/users/company-notifications/unread-count:
 *   get:
 *     summary: Unread count for company inbox
 *     description: Company JWT only.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ unreadCount } in data"
 *       403: { description: Not company JWT }
 */

/**
 * @swagger
 * /api/v1/users/company-notifications/read-all:
 *   patch:
 *     summary: Mark all company inbox notifications read
 *     description: Company JWT only.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "{ modifiedCount } in data"
 *       403: { description: Not company JWT }
 */

/**
 * @swagger
 * /api/v1/users/company-notifications/{notificationId}/read:
 *   patch:
 *     summary: Mark one company notification read
 *     description: Company JWT only. Must be recipientCompany for this tenant.
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Updated notification }
 *       403: { description: Forbidden }
 *       404: { description: Not found }
 */
