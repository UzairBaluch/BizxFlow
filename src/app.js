import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check (no DB) – for Railway/proxy
app.get("/", (_, res) => res.json({ ok: true, message: "BizxFlow API" }));
app.get("/health", (_, res) => res.json({ status: "ok" }));

app.use("/api/v1/users", userRouter);

export { app };
