import httpRequest from "./httpRequest";

export const getProducts = () => httpRequest.get("/products");

export const getProductById = (id) =>
  httpRequest.get(`/products/${id}`);

export const createProduct = (data) =>
  httpRequest.post("/products", data);

export const updateProduct = (id, data) =>
  httpRequest.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  httpRequest.delete(`/products/${id}`);