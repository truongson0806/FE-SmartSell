import httpRequest from "./httpRequest";

export const login = (data) =>
  httpRequest.post("/auth/login", data);

export const register = (data) =>
  httpRequest.post("/auth/register", data);

export const getProfile = () =>
  httpRequest.get("/auth/profile");