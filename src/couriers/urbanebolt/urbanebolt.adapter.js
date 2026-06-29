import CourierInterface from "../interfaces/courier.interface.js";
import mapper from "./urbanebolt.mapper.js";
import urbaneboltService from "./urbanebolt.service.js";

class UrbaneboltAdapter extends CourierInterface {
  async createOrder(orderData) {
    const payload = mapper.toCourierRequest(orderData);

    const response = await urbaneboltService.createOrder(payload);
    console.log(response)
    return mapper.toApplicationResponse(response);
  }

  async trackOrder(orderId) {
    const response = await urbaneboltService.trackOrder(orderId);
    return mapper.toApplicationResponse(response);
  }

  async cancelOrder(orderId) {
    const response = await urbaneboltService.cancelOrder(orderId);

    return mapper.toApplicationResponse(response);
  }
}

export default UrbaneboltAdapter;