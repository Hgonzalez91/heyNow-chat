import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from './routes/messages.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { FRONTEND_URL } from './config.js'

const app = express();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", messagesRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /api for API endpoints.');
  });

export default app;
