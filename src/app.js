import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

config()
const app = express();
const url = process.env.FRONTEND_URL

app.use(
  cors({
    origin: url,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", messagesRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API. Use /api for API endpoints.");
});

export default app;
