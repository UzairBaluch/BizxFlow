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
        "**Real-time notifications (Socket.io):** Same host and port as this API (e.g. `http://localhost:8000` locally). Connect with the official `socket.io-client` library. Pass the **user** access token — not a company token — as `auth: { token: \"<accessToken>\" }` on connect (optional fallback: query string `token`). Server emits event **`notification`** with a JSON object matching the `Notification` model (same fields you get from `GET /my-notifications`). Company JWT connections are rejected. Align browser `CORS_ORIGIN` with your frontend origin.",
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
      },
    },
    tags: [
      { name: "Auth", description: "Register, login, tokens, password reset" },
      { name: "Users", description: "Profiles, company, directory" },
      { name: "Attendance", description: "Check-in/out and records (tenant-scoped)" },
      { name: "Tasks", description: "Create (Company/Admin/Manager); list/update as assignee" },
      { name: "Leave", description: "Submit (user); approve/list (Company/Admin/Manager)" },
      { name: "Dashboard", description: "Admin/Manager user metrics for their company" },
      { name: "Announcements", description: "Company announcements (tenant-scoped)" },
      {
        name: "Notifications",
        description:
          "REST: list, unread count, mark read (user JWT only; tenant-scoped). New notifications are also pushed over Socket.io — see API description.",
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
