import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BizxFlow API",
      version: "1.0.0",
      description: [
        "Workforce management REST API (multi-tenant by `companyId`).",
        "",
        "**Auth:** Send `Authorization: Bearer <accessToken>` (or cookies if your client uses them). Use **Authorize** in Swagger UI and paste the token only.",
        "",
        "**Login:** `POST /api/v1/users/login` returns `data.type` of `\"company\"` or `\"user\"`. Company accounts use a company JWT; user accounts are employees/managers with `companyId`.",
        "",
        "**Real-time notifications (Socket.io):** Same host and port as this API. Connect with `socket.io-client` and `auth: { token: \"<accessToken>\" }`. **User** tokens join room `user:<userId>`; **company** tokens join `company:<companyId>`. Server emits **`notification`** with the same document shape as REST (`GET /my-notifications` or `GET /company-notifications`). Align `CORS_ORIGIN` with your frontend origin.",
        "",
        "**Frontend testing:** Base URL defaults to `http://localhost:8000`. Set `CORS_ORIGIN` on the server for your frontend origin. Open **/api-docs** for interactive docs or **/api-docs.json** for the raw OpenAPI spec.",
      ].join("\n"),
    },
    servers: [
      { url: "http://localhost:8000", description: "Local" },
      {
        url: "https://YOUR_API_HOST",
        description: "Production (replace with your deployed API URL)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "accessToken from login response (data.accessToken)",
        },
      },
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            statusCode: { type: "integer", example: 200 },
            data: { description: "Payload (shape varies by endpoint)" },
            message: { type: "string", example: "success" },
            success: { type: "boolean", example: true },
          },
        },
        Notification: {
          type: "object",
          description:
            "Exactly one of `recipient` (User id) or `recipientCompany` (Company id) is set per document.",
          properties: {
            _id: { type: "string" },
            companyId: { type: "string" },
            recipient: { type: "string", nullable: true },
            recipientCompany: { type: "string", nullable: true },
            type: {
              type: "string",
              enum: [
                "TASK_ASSIGNED",
                "TASK_STATUS_UPDATED",
                "LEAVE_SUBMITTED",
                "LEAVE_APPROVED",
                "LEAVE_REJECTED",
                "ANNOUNCEMENT_CREATED",
                "ATTENDANCE_CHECK_IN",
                "ATTENDANCE_CHECK_OUT",
              ],
            },
            title: { type: "string" },
            body: { type: "string" },
            read: { type: "boolean" },
            metadata: { type: "object", additionalProperties: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    tags: [
      { name: "Auth", description: "Register, login, tokens, password reset" },
      { name: "Users", description: "Profiles, company, directory" },
      { name: "Attendance", description: "Check-in/out and records (tenant-scoped)" },
      { name: "Tasks", description: "Create (Company JWT or Manager user); list/update as assignee" },
      { name: "Leave", description: "Submit (user); approve/list (Company JWT or Manager user)" },
      { name: "Dashboard", description: "Company JWT or Manager user metrics for their company" },
      { name: "Announcements", description: "Company announcements (tenant-scoped)" },
      {
        name: "Notifications",
        description:
          "User inbox: `/my-notifications` (+ `/unread-count` at path root). Company inbox: `/company-notifications/*`. Use the matching JWT. Document shape: **components.schemas.Notification**. Rows are created from tasks, leave, announcements, attendance — not via a public create endpoint.",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../docs/user.paths.js"),
    path.join(__dirname, "../docs/announcement.paths.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);
if (!swaggerSpec.paths) swaggerSpec.paths = {};

export { swaggerSpec };
