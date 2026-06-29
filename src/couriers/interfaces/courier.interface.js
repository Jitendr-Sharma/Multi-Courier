class CourierInterface {
  async createOrder() {
    throw new Error("createOrder() must be implemented.");
  }

  async trackOrder() {
    throw new Error("trackOrder() must be implemented.");
  }

  async cancelOrder() {
    throw new Error("cancelOrder() must be implemented.");
  }
}

export default CourierInterface;