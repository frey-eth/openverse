import axios, { AxiosResponse } from "axios";

const handleResponse = (response: AxiosResponse<any>) => {
  return response as any;
};

const baseUrl: string = "https://deep-index.moralis.io/api/v2.2" || "";

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API as string,
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    return handleResponse(response);
  },
  async (error) => {
    return Promise.reject(handleError(error));
  }
);

const handleError = (error: AxiosResponse<any>) => {
  return error;
};

export default axiosClient;
