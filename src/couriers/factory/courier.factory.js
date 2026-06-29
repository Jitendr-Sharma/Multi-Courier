import UrbaneboltAdapter from "../urbanebolt/urbanebolt.adapter.js";

class CourierFactory {
  static getCourier(courierPartner) {
    switch (courierPartner.toLowerCase()) {
      case "urbanebolt":
        return new UrbaneboltAdapter();

      default:
        throw new Error(`Courier '${courierPartner}' is not supported.`);
    }
  }
}

export default CourierFactory;