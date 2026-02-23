import { api } from "./api.js";

export const getApplications = async (params = {}) => {
  try {
    const { data } = await api.get("/applications", { params });
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const getApplication = async (applicationId) => {
  try {
    const { data } = await api.get(`/applications/${applicationId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const createApplication = async (formData) => {
  try {
    const { data } = await api.post("/applications", formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const updateApplication = async (applicationId, formData) => {
  try {
    const { data } = await api.put(`/applications/${applicationId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const deleteApplication = async (applicationId) => {
  try {
    await api.delete(`/applications/${applicationId}`);
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};
