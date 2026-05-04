import httpRequest from "./httpRequest";

export const getCart = () =>
  httpRequest.get("/cart");

export const addToCart = (data) =>
  httpRequest.post("/cart", data);

export const updateCartItem = (id, data) =>
  httpRequest.put(`/cart/${id}`, data);

export const removeCartItem = (id) =>
  httpRequest.delete(`/cart/${id}`);