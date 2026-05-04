import httpRequest from "./httpRequest";

export const createOrder = (data) =>
  httpRequest.post("/orders", data);

export const getMyOrders = () =>
  httpRequest.get("/orders/my");

export const getOrderById = (id) =>
  httpRequest.get(`/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  httpRequest.put(`/orders/${id}`, { status });