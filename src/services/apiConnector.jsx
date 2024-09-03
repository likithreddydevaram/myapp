import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}/api/v1`, // Your base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
