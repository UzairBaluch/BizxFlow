import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";

const app = express();

app.get("/", (_, res) => res.json({ ok: true, message: "BizxFlow API" }));
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

app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  console.error("[BizxFlow] route error", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export { app };
