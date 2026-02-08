import { api } from "./api.js";

export const register = async (formData) => {
  try {
    console.log(formData, "register");
    const { data } = await api.post("/auth/register", formData);
    if (data.err) {
      throw new Error(data.err);
    }
    if (data.token) {
      // store token in localStorage
      // return the payload
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }
    throw new Error("Invalid response from server");
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const login = async (formData) => {
  try {
    const { data } = await api.post("/auth/login", formData);
    if (data.err) {
      throw new Error(data.err);
    }
    if (data.token) {
      // store token in localStorage
      // return the payload
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }
    throw new Error("Invalid response from server");
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};
