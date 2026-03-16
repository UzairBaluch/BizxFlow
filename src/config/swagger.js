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

// Ensure paths are always present in Swagger UI
if (!swaggerSpec.paths) swaggerSpec.paths = {};
const registerPath = "/api/v1/users/register";
swaggerSpec.paths[registerPath] = {
  post: {
    summary: "Register a company (company signup only)",
    tags: ["Auth"],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["email", "password", "companyName"],
            properties: {
              email: { type: "string", format: "email" },
              password: { type: "string" },
              companyName: { type: "string" },
              logo: { type: "string", format: "binary" },
            },
          },
        },
      },
    },
    responses: {
      201: { description: "Company registered successfully" },
      400: { description: "Validation error or email already exists" },
    },
  },
};
const addUserPath = "/api/v1/users/add-user";
swaggerSpec.paths[addUserPath] = {
  post: {
    summary: "Add a user (Company, Admin or Manager only)",
    tags: ["Users"],
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["fullName", "email", "password", "role"],
            properties: {
              fullName: { type: "string" },
              email: { type: "string", format: "email" },
              password: { type: "string" },
              role: { type: "string", enum: ["Admin", "Manager", "Employee"] },
              picture: { type: "string", format: "binary" },
            },
          },
        },
      },
    },
    responses: {
      201: { description: "User added successfully" },
      400: { description: "Validation error or email already exists" },
      401: { description: "Unauthorized" },
      403: { description: "Forbidden" },
    },
  },
};
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
