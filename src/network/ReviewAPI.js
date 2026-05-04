import httpRequest from "./httpRequest";

export const createReview = (data) =>
  httpRequest.post("/reviews", data);

export const getReviewsByProduct = (productId) =>
  httpRequest.get(`/reviews/product/${productId}`);

export const deleteReview = (id) =>
  httpRequest.delete(`/reviews/${id}`);