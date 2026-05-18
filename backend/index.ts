import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.ts";
import apiSpec from "./openapi.yaml";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/users.ts";

// Create Express application, WebSocket server and HTTP server
const app = express();
const server = createServer(app);

// Use CORS and logging middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://termful.up.railway.app"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(morgan(":method :url :status"));

// Use Better Auth routes
app.all("/api/auth/{*any}", toNodeHandler(auth));

// Use JSON middleware
app.use(express.json());

// Expose Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

// Add routers (add similar code lines to the one below when you create more routers)
app.use("/users", userRouter);

// Start server
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
