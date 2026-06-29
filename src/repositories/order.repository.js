import Order from "../models/order.model.js";

class OrderRepository {
  async create(orderData) {
    return await Order.create(orderData);
  }

  async update(awb, data) {
    return await Order.findOneAndUpdate(
    { orderId:awb },
    { $set: data },
    { new: true }
  );
  }

  async findByOrderId(orderId) {
    return await Order.findOne({ orderId });
  }
}

export default new OrderRepository();