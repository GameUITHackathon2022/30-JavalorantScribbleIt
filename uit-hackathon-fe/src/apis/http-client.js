import axios from "axios";

const baseURL = "http://localhost:5000";

const httpClient = axios.create({
  baseURL: `${baseURL}/api`,
});

httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpClient };
