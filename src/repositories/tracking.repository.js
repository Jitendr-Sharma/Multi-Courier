import Tracking from "../models/tracking.model.js";

class TrackingRepository {
  async create(data) {
    return await Tracking.create(data);
  }

  async findByAwb(awb) {
    return await Tracking.find({ awb }).sort({ createdAt: -1 });
  }

  async findLatestByAwb(awb) {
    return await Tracking.findOne({ awb }).sort({ createdAt: -1 });
  }
}

export default new TrackingRepository();