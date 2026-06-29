import { Router } from "express";
import {
  createOrder,
  trackOrder,
  cancelOrder,
} from "../controllers/order.controller.js";
import validate from "../middleware/validation.middleware.js";
import { createOrderSchema } from "../validations/order.validation.js";

const router = Router();

// Create Order

router.post("/", validate(createOrderSchema), createOrder);


// Track Order
router.get("/:awb/track", trackOrder);

// Cancel Order
router.post("/:awb/cancel", cancelOrder);

export default router;
