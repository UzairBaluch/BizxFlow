import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/user.routes.js";
import { swaggerSpec } from "./config/swagger.js";
import { ORIGIN } from "../src/constants.js";

const app = express();
app.set("trust proxy", 1);

app.get("/", (_, res) => res.json({ ok: true, message: "BizxFlow API" }));
app.get("/health", (_, res) => res.json({ status: "ok" }));
app.get("/favicon.ico", (_, res) => res.status(204).end());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || ORIGIN,
    credentials: true,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,

    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.get("/api-docs.json", (_, res) => res.json(swaggerSpec));
app.get("/api-docs", (_, res) => res.redirect(302, "/api-docs/"));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "/api-docs.json",
      persistAuthorization: true,
    },
  })
);

app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  console.error("[BizxFlow] route error", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    error: message,
    ...(err.errors?.length && { errors: err.errors }),
  });
});

export { app };
