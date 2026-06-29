import client from "./urbanebolt.client.js";
import { URBANEBOLT_ENDPOINTS } from "./urbanebolt.constants.js";


class UrbaneboltService {
  token = null;

  async getToken() {
    if (this.token) {
      return this.token;
    }

    const response = await client.post(URBANEBOLT_ENDPOINTS.GET_TOKEN, {
      username: process.env.URBANEBOLT_USERNAME,
      password: process.env.URBANEBOLT_PASSWORD,
    });
    this.token = response.data.access_token;
    return this.token;
  }

  async createOrder(payload) {
    const token = await this.getToken();
    const { data } = await client.post(
      URBANEBOLT_ENDPOINTS.CREATE_ORDER,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (data.errorResponse && data.errorResponse.length > 0) {
      const error = new Error(data.failureResponse[0].message);
      error.status = 409;
      throw error;
    }
    return data;
  }

  async trackOrder(orderId) {
    const token = await this.getToken();
    const { data } = await client.get(URBANEBOLT_ENDPOINTS.TRACK_ORDER, {
      params: {
        awb: orderId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  async cancelOrder(orderId) {
    const token = await this.getToken();

    const { data } = await client.post(
      URBANEBOLT_ENDPOINTS.CANCEL_ORDER,
      {
        awbs: orderId.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(data)
    if (data.failureResponse && data.failureResponse.length > 0) {
      const error = new Error(data.failureResponse[0].message);
      error.status = 409;
      throw error;
    }
    return data;
  }
}

export default new UrbaneboltService();
