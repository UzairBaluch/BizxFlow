/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a company (company signup only)
 *     tags: [Auth]
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
 *       201: { description: Company registered successfully }
 *       400: { description: Validation error or email already exists }
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
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
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken: { type: string }
 *                     refreshToken: { type: string }
 *       400: { description: Invalid credentials }
 */

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Logged out successfully }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200: { description: Token refreshed }
 *       401: { description: Invalid refresh token }
 */

/**
 * @swagger
 * /api/v1/users/checkIn:
 *   post:
 *     summary: Check in
 *     tags: [Attendance]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Checked in successfully }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/checkOut:
 *   post:
 *     summary: Check out
 *     tags: [Attendance]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Checked out successfully }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/check-record:
 *   get:
 *     summary: Get my attendance record
 *     tags: [Attendance]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Attendance record }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/record-all:
 *   get:
 *     summary: Get all attendance records (admin)
 *     tags: [Attendance]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: All attendance records }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/tasks:
 *   get:
 *     summary: Get my tasks
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of tasks }
 *       401: { description: Unauthorized }
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               dueDate: { type: string, format: date }
 *     responses:
 *       201: { description: Task created }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/tasks/{id}:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Task updated }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/submit-leave:
 *   post:
 *     summary: Submit leave request
 *     tags: [Leave]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate: { type: string, format: date }
 *               endDate: { type: string, format: date }
 *               reason: { type: string }
 *     responses:
 *       201: { description: Leave submitted }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/my-leaves:
 *   get:
 *     summary: Get my leave requests
 *     tags: [Leave]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of leaves }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/all-leaves:
 *   get:
 *     summary: Get all leave requests (admin)
 *     tags: [Leave]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: All leaves }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
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
 *       200: { description: Reset email sent }
 *       400: { description: User not found }
 */

/**
 * @swagger
 * /api/v1/users/reset-password/{token}:
 *   post:
 *     summary: Reset password with token
 *     tags: [Auth]
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
 *     summary: Get all users (admin)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of users }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/add-user:
 *   post:
 *     summary: Add a user (Company, Admin or Manager only)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
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
 *               role: { type: string, enum: ["Admin", "Manager", "Employee"] }
 *               picture: { type: string, format: binary }
 *     responses:
 *       201: { description: User added successfully }
 *       400: { description: Validation error or email already exists }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden (not Company/Admin/Manager) }
 */

/**
 * @swagger
 * /api/v1/users/change-password:
 *   patch:
 *     summary: Change password
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword: { type: string }
 *               newPassword: { type: string }
 *     responses:
 *       200: { description: Password changed }
 *       401: { description: Unauthorized }
 */

/**
 * @swagger
 * /api/v1/users/update-profile:
 *   patch:
 *     summary: Update profile
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
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
 */

/**
 * @swagger
 * /api/v1/users/dashboard:
 *   get:
 *     summary: Get dashboard data
 *     tags: [Dashboard]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Dashboard data }
 *       401: { description: Unauthorized }
 */
