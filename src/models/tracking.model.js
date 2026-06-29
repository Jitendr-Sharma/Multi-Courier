import mongoose from "mongoose";

const TrackingSchema = new mongoose.Schema(
  {
    orderId: String,

    awb: String,

    currentStatus: String,

    trackingResponse: Object,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tracking", TrackingSchema);