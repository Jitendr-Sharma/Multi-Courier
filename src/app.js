import express from "express";
import orderRoutes from "./routes/order.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

/**
 * Parse incoming JSON requests
 */
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

app.use("/api/orders", orderRoutes);

/**
 * Global Error Handler
 */

app.use(errorMiddleware);

export default app;
