import OrderService from "../services/order.service.js";
import { successResponse } from "../utils/response.js";

export const createOrder = async (req, res, next) => {
  try {
   // console.log("Request Body:", req.body);
   const response = await OrderService.createOrder(req.body);

   return successResponse(
      res,
       response,
      "Order Created Successfully",
      201
    );
  } catch (error) {
    next(error);
  }
};


export const trackOrder = async (req, res, next) => {
  try {
    const { awb, courierPartner } = req.params;
    const response = await OrderService.trackOrder(awb, courierPartner);

    return successResponse(
      res,
      response,
      "Tracking Details Fetched Successfully"
    );
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const { awb, courierPartner } = req.params;
    const response = await OrderService.cancelOrder(awb, courierPartner);
    return successResponse(
      res,
      response,
      "Shipment Cancelled Successfully"
    );
  } catch (error) {
    next(error);
  }
};