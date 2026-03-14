/**
 * @swagger
 * /api/v1/users/announcements:
 *   post:
 *     summary: Create announcement (Admin/Manager only)
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
 *         description: Announcement created
 *       400:
 *         description: Title and body required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin or Manager only
 */

/**
 * @swagger
 * /api/v1/users/announcements:
 *   get:
 *     summary: List all announcements
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of announcements (newest first)
 *       401:
 *         description: Unauthorized
 */
