import express from "express";
import sequelize from "./config/database";
import { exec } from "child_process";
import authRoutes from "./routes/authRoutes";
import dataRoutes from "./routes/dataRoutes";
import profileRoutes from "./routes/profileRoutes";
import errorHandler from "./middlewares/errorsMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

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

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);
app.use("/api", profileRoutes);

// Register error handler middleware
app.use(errorHandler);

