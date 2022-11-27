import { httpClient } from "./http-client";

export const getOrganizationById = (id) => {
  return httpClient.get(`/organizations/${id}`);
};
