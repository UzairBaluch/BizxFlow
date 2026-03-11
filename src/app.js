import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
// import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.path}`);
  next();
});

// Health routes first (no middleware) so Railway always gets a response
app.get("/", (req, res) => {
  console.log("[BizxFlow] GET / hit");
  res.setHeader("Content-Type", "application/json");
  res.status(200).end(JSON.stringify({ ok: true, message: "BizxFlow API" }));
});
app.get("/health", (_, res) => res.json({ status: "ok" }));
app.get("/favicon.ico", (_, res) => res.status(204).end());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/users", userRouter);

// Catch errors so the process doesn't crash on request
app.use((err, req, res, next) => {
  console.error("[BizxFlow] route error", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export { app };
