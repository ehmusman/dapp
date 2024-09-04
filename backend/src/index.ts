import express from "express";
import sequelize from "./config/database";
import { exec } from "child_process";
import authRoutes from "./routes/authRoutes";
import dataRoutes from "./routes/dataRoutes";
import profileRoutes from "./routes/profileRoutes";
import errorHandler from "./middlewares/errorsMiddleware";
import { Server } from "socket.io";
import cors, { CorsOptions } from "cors";
import http from "http";
import jwt from "jsonwebtoken";

import "express-async-errors";
import authService from "./services/authService";

const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

export const app = express();
const server = http.createServer(app);

const whitelist: string[] = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) != -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.json());


// Optional: Automatically run migrations before starting the server
const runMigrations = async () => {
  return new Promise((resolve, reject) => {
    exec("npx sequelize-cli db:migrate", (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration error: ${stderr}`);
        return reject(error);
      }
      console.log(`Migration output: ${stdout}`);
      resolve(stdout);
    });
  });
};

const startServer = async () => {
  try {
    if (isDevelopment) {
      // Only use sync in development
      await sequelize.sync();
      console.log("Database synced in development mode");
    } else {
      // Run migrations in production
      await runMigrations();
      console.log("Migrations applied");
    }

    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("a user connected");
    });

    app.set("io", io);

    initializeSocketIO(io);

    // Start the Express server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    // process.exit(1);
  }
};

startServer();

const initializeSocketIO = (io: any) => {
  return io.on("connection", async (socket: any) => {
    try {
      const authToken = socket.handshake.headers?.authorization;
      const decodedToken: any = await jwt.verify(
        authToken,
        process.env.JWT_SECRET!
      ); // decode the token
      const user = await authService.findByPk(decodedToken?.userId);
      socket.join(user?.username);
    } catch (error) {
      socket.disconnect();
    }
  });
};
// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api", profileRoutes);

// Register error handler middleware
app.use(errorHandler);

export const emitSocketEvent = (io: any, username: string, payload: any) => {
  io.to(username).emit("newMessage", payload);
};
