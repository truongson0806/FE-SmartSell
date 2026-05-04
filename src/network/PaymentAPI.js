import httpRequest from "./httpRequest";

export const createPayment = (data) =>
  httpRequest.post("/payments", data);

export const getPaymentStatus = (id) =>
  httpRequest.get(`/payments/${id}`);

export const callbackPayment = (data) =>
  httpRequest.post("/payments/callback", data);