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
      description: "Workforce management REST API",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: "Auth" },
      { name: "Attendance" },
      { name: "Tasks" },
      { name: "Leave" },
      { name: "Users" },
      { name: "Dashboard" },
      { name: "Announcements", description: "Company announcements" },
    ],
  },
  apis: [
    path.join(__dirname, "../docs/user.paths.js"),
    path.join(__dirname, "../docs/announcement.paths.js"),
    path.join(__dirname, "../routes/*.js"),
  ],
};
const apiPaths = options.apis;
console.log("[Swagger] apis:", apiPaths);
const swaggerSpec = swaggerJSDoc(options);

// Ensure announcements path is always present in Swagger UI
if (!swaggerSpec.paths) swaggerSpec.paths = {};
const annPath = "/api/v1/users/announcements";
swaggerSpec.paths[annPath] = {
    post: {
      summary: "Create announcement (Admin/Manager only)",
      tags: ["Announcements"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title", "body"],
              properties: { title: { type: "string" }, body: { type: "string" } },
            },
          },
        },
      },
      responses: { 201: { description: "Announcement created" }, 400: { description: "Bad request" }, 401: { description: "Unauthorized" }, 403: { description: "Forbidden" } },
    },
    get: {
      summary: "List all announcements",
      tags: ["Announcements"],
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: "List of announcements" }, 401: { description: "Unauthorized" } },
  },
};

export { swaggerSpec };
