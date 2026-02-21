import { api } from "./api.js";

export const getApplications = async () => {
  try {
    const { data } = await api.get("/applications");
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getApplication = async (applicationId) => {
  try {
    const { data } = await api.get(`/applications/${applicationId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createApplication = async (formData) => {
  try {
    const { data } = await api.post("/applications", formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateApplication = async (applicationId, formData) => {
  try {
    const { data } = await api.put(`/applications/${applicationId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteApplication = async (applicationId) => {
  try {
    await api.delete(`/applications/${applicationId}`);
  } catch (e) {
    console.log(e);
  }
};
