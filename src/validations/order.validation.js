import Joi from "joi";

const addressSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  address: Joi.string().required(),
  addressType: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  pincode: Joi.number().required()
});

const invoiceSchema = Joi.object({
  number: Joi.string().required(),
  date: Joi.date().required(),
  value: Joi.number().required()
});

export const createOrderSchema =Joi.object({
  courierPartner: Joi.string()
    .valid("urbanebolt")
    .required(),

  orderId: Joi.string().required(),
  customerCode: Joi.string().required(),
  declaredValue: Joi.number().required(),

  itemDescription: Joi.string().required(),

  collectableValue: Joi.number().required(),

  height: Joi.number().required(),

  length: Joi.number().required(),

  breadth: Joi.number().required(),

  weight: Joi.number().required(),

  pieces: Joi.number().integer().required(),

  serviceType: Joi.string().required(),

  payMode: Joi.string()
    .valid("COD", "PREPAID")
    .required(),

  itemQuantity: Joi.number().integer().required(),

  invoice: invoiceSchema.required(),

  shipper: addressSchema.required(),

  return: addressSchema.required(),

  consignee: addressSchema.required()
});