import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    customerCode: String,

    courierPartner: String,

    awb: String,

    status: {
      type: String,
      enum: [
        "PENDING",
        "CREATED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELLED",
        "FAILED",
      ],
      default: "PENDING",
    },

    courierStatus: String,

    requestPayload: Object,

    responsePayload: Object,

    errorMessage: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
