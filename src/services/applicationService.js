import { api } from "./api.js";

export const getApplications = async (params = {}) => {
  try {
    const { data } = await api.get("/applications", { params });
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const getApplication = async (applicationId) => {
  try {
    const { data } = await api.get(`/applications/${applicationId}`);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const createApplication = async (formData) => {
  try {
    const { data } = await api.post("/applications", formData);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const updateApplication = async (applicationId, formData) => {
  try {
    const { data } = await api.put(`/applications/${applicationId}`, formData);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const deleteApplication = async (applicationId) => {
  try {
    await api.delete(`/applications/${applicationId}`);
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const getDashboardStats = async () => {
  try {
    const { data } = await api.get("/applications/stats/dashboard");
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};
