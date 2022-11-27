import { httpClient } from "./http-client";

export const login = async (idToken) => {
  return httpClient.post("/auth/login", { idToken });
};

export const getUserByEmail = async (email) => {
  return httpClient.post("/auth/get-user", { email });
};

export const chooseRole = async (role, email) => {
  return httpClient.post("/auth/choose-role", { email, role });
};
