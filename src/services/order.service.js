import CourierFactory from "../couriers/factory/courier.factory.js";
import OrderRepository from "../repositories/order.repository.js";
import TrackingRepository from "../repositories/tracking.repository.js";

class OrderService {
  getCourier(courierPartner = "urbanebolt") {
    return CourierFactory.getCourier(courierPartner);
  }

  async createOrder(orderData) {
    // Check duplicate order
    const existingOrder = await OrderRepository.findByOrderId(
      orderData.orderId
    );

    if (existingOrder) {
      const error = new Error("Order already exists");
      error.status = 409;
      throw error;
    }

    // Save order before courier API call
    await OrderRepository.create({
      ...orderData,
      status: "PENDING",
      requestPayload: orderData,
    });

    try {
      const courier = this.getCourier(orderData.courierPartner);

      const response = await courier.createOrder(orderData);

      // Update after successful creation
      await OrderRepository.update(orderData.orderId, {
        status: "CREATED",
        responsePayload: response,
      });

      return response;
    } catch (error) {
      // Update if courier API fails
      await OrderRepository.update(orderData.orderId, {
        status: "FAILED",
        errorMessage: error.message,
      });

      throw error;
    }
  }

  async trackOrder(awb, courierPartner = "urbanebolt") {
    const courier = this.getCourier(courierPartner);

    const response = await courier.trackOrder(awb);

    await OrderRepository.update(awb, {
    courierStatus: response.status || "",
  });

  // Save tracking history
  await TrackingRepository.create(response);

    return response;
  }

  async cancelOrder(awb, courierPartner = "urbanebolt") {
    const courier = this.getCourier(courierPartner);

    const response = await courier.cancelOrder(awb);

     await OrderRepository.update(awb, {
    courierStatus: response.status || "",
  });

    return response;
  }
}

export default new OrderService();