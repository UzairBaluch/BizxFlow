/**
 * @swagger
 * /api/v1/users/announcements:
 *   post:
 *     summary: Create announcement (Company or Admin/Manager; tenant-scoped)
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement created (ApiResponse)
 *       400:
 *         description: Title and body required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not Company/Admin/Manager)
 *   get:
 *     summary: List announcements for your company (newest first)
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of announcements, newest first (ApiResponse)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no company context)
 */
