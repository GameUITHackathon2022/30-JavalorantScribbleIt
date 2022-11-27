import { httpClient } from "./http-client";

import { wait } from "../utils/wait";

export const getEvents = async (page) => {
  await wait(1);
  return httpClient.get(`/events?page=${page}&limit=5`);
};

export const getEventById = async (id) => {
  return httpClient.get(`/events/${id}`);
};
