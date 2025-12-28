import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

// Configuring dotenv
config({
      path: "./data/config.env",
});

// Using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,          // to send cookies with requests
}));

// Using Routes
app.use( "/api/v1/users", userRouter);  // we can add a common prefix to all routes of userRouter
app.use( "/api/v1/tasks", taskRouter);  // we can add a common prefix to all routes of taskRouter

app.get("/", (req, res) => {
      res.send("Nice Working");
});

// Using Error Middleware
app.use(errorMiddleware);