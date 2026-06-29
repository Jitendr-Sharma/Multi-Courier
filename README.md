# 🚚 Courier Platform

A scalable courier integration platform built with **Node.js**, **Express**, and **MongoDB**.

This repository exposes a unified API for working with courier partners via a factory/adapter architecture. It validates inbound requests, persists order state, and forwards shipments to the configured courier integration.

---

## ✨ Core Features

- Create shipment orders
- Track shipments
- Cancel shipments
- Courier integration via Factory + Adapter patterns
- Request validation with Joi
- MongoDB persistence for orders and tracking history
- Centralized error handling
- Environment-based configuration

---

## 🧩 Tech Stack

- Node.js
- Express.js
- Axios
- Joi
- Mongoose
- dotenv

---

## 📁 Folder Structure

```text
src/
├── app.js
├── server.js
├── config/
│   └── database.js
├── controllers/
│   └── order.controller.js
├── couriers/
│   ├── factory/
│   │   └── courier.factory.js
│   ├── interfaces/
│   │   └── courier.interface.js
│   └── urbanebolt/
│       ├── urbanebolt.adapter.js
│       ├── urbanebolt.client.js
│       ├── urbanebolt.constants.js
│       ├── urbanebolt.mapper.js
│       └── urbanebolt.service.js
├── middleware/
│   ├── error.middleware.js
│   └── validation.middleware.js
├── models/
│   ├── order.model.js
│   └── tracking.model.js
├── repositories/
│   ├── order.repository.js
│   └── tracking.repository.js
├── routes/
│   └── order.routes.js
├── services/
│   └── order.service.js
├── utils/
│   └── response.js
└── validations/
    └── order.validation.js
```

---

## 🚀 Installation

```bash
git clone <repository-url>
cd courier-platform
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017
URBANEBOLT_BASE_URL=https://uat.urbanebolt.in
URBANEBOLT_USERNAME=YOUR_USERNAME
URBANEBOLT_PASSWORD=YOUR_PASSWORD
URBANEBOLT_CUSTOMER_CODE=UEBCUS0008
```

> Note: `MONGODB_URL` is used by `src/config/database.js` and the code currently connects to the database at `${MONGODB_URL}/shortUrl`.

---

## ▶️ Running the Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## 📌 API Endpoints

### Health Check

```http
GET /health
```

### Create Shipment

```http
POST /api/orders
```

Request body must match the Joi schema in `src/validations/order.validation.js`.

Example body:

```json
{
  "courierPartner": "urbanebolt",
  "orderId": "ORDER123",
  "customerCode": "UEBCUS0008",
  "declaredValue": 1000,
  "itemDescription": "Books",
  "collectableValue": 0,
  "height": 10,
  "length": 15,
  "breadth": 5,
  "weight": 2,
  "pieces": 1,
  "serviceType": "STANDARD",
  "payMode": "PREPAID",
  "itemQuantity": 1,
  "invoice": {
    "number": "INV123",
    "date": "2026-06-29",
    "value": 1000
  },
  "shipper": {
    "name": "Sender",
    "email": "sender@example.com",
    "mobile": "9999999999",
    "address": "123 Sender St",
    "addressType": "Home",
    "city": "City",
    "state": "State",
    "country": "Country",
    "pincode": 123456
  },
  "return": {
    "name": "Return Name",
    "email": "return@example.com",
    "mobile": "9999999999",
    "address": "123 Return St",
    "addressType": "Home",
    "city": "City",
    "state": "State",
    "country": "Country",
    "pincode": 123456
  },
  "consignee": {
    "name": "Receiver",
    "email": "receiver@example.com",
    "mobile": "9999999999",
    "address": "123 Receiver St",
    "addressType": "Home",
    "city": "City",
    "state": "State",
    "country": "Country",
    "pincode": 123456
  }
}
```

### Track Shipment

```http
GET /api/orders/:awb/track
```

The current implementation defaults to `urbanebolt` if no courier partner value is provided.

### Cancel Shipment

```http
POST /api/orders/:awb/cancel
```

The current implementation also defaults to `urbanebolt` for cancels.

---

## 💾 Data Persistence

### Order model

- `orderId` (unique)
- `customerCode`
- `courierPartner`
- `awb`
- `status`
- `courierStatus`
- `requestPayload`
- `responsePayload`
- `errorMessage`

### Tracking model

- `orderId`
- `awb`
- `currentStatus`
- `trackingResponse`

---

## 🧠 Application Flow

1. Client request hits `src/routes/order.routes.js`
2. Validation middleware checks the payload
3. Controller calls `OrderService`
4. `OrderService` saves the order and dispatches courier logic
5. `CourierFactory` returns the courier adapter
6. `UrbaneboltAdapter` converts data via the mapper
7. `UrbaneboltService` calls the courier API via Axios
8. Results are persisted and returned to the client

---

## 🏗️ Design Patterns

### Factory Pattern

The courier factory selects the correct adapter by courier partner.

### Adapter Pattern

The adapter converts the internal order model into courier-specific payloads.

---

## ⚠️ Notes

- The project is currently configured for a single courier: `urbanebolt`.
- `src/couriers/urbanebolt/urbanebolt.mapper.js` maps the request fields into the courier payload.
- The code uses `dotenv/config` in `src/server.js`.
- `src/server.js` connects to MongoDB before starting the HTTP server.
- `trackOrder` and `cancelOrder` route handlers currently ignore `courierPartner` path param and use the default adapter.

---

## 📦 Scripts

- `npm run dev` — start with nodemon
- `npm start` — run the app once

---

## ✅ Verified Source

This README was generated from the current code in `src/` and reflects the actual routes, services, and configuration used by the project.
