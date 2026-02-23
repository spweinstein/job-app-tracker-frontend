import { api } from "./api.js";

export const getResumes = async (params = {}) => {
  try {
    const { data } = await api.get("/resumes", { params });
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const getResume = async (resumeId) => {
  try {
    const { data } = await api.get(`/resumes/${resumeId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const createResume = async (formData) => {
  try {
    const { data } = await api.post("/resumes", formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const updateResume = async (resumeId, formData) => {
  try {
    const { data } = await api.put(`/resumes/${resumeId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const deleteResume = async (resumeId) => {
  try {
    await api.delete(`/resumes/${resumeId}`);
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};
