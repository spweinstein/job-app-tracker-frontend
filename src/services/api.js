import axios from "axios";

/*
This function gets the token from the localStorage.
Use promise wrapper to ensure the token is retrieved asynchronously.
*/

const getToken = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(token ? `Bearer ${token}` : null);
  });
};

/*
This function gets the base URL from the .env file.
*/
const getBaseURL = () => {
  const baseURL = import.meta.env.VITE_BACK_END_SERVER_URL;
  if (!baseURL) {
    throw new Error("Base URL is not set");
  }
  return baseURL;
};

/* 
This function creates an axios instance with the base URL found in the .env file.
It then configures middleware to add the token to the request headers for all requests.
*/

const createAPI = (baseURL) => {
  const api = axios.create({
    baseURL: baseURL,
  });

  /*
  Add the token to the request headers for all requests.
  If the token is not found, do not add it to the request headers.
  */

  api.interceptors.request.use(
    async (config) => {
      const token = await getToken();

      if (token) {
        config.headers["Authorization"] = token;
      }

      return config;
    },
    (error) => {
      console.log("Request error: ", error);
      return Promise.reject(error);
    },
  );

  return api;
};

/*
This function connects to the API and returns an axios instance.
It is the main entry point for the API.
*/
const connectAPI = () => {
  const baseURL = getBaseURL();
  return createAPI(baseURL);
};

const api = connectAPI();

export { api };
