import { api } from "./api.js";

export const getCoverLetters = async (params = {}) => {
  try {
    const { data } = await api.get("/coverLetters", { params });
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const getCoverLetter = async (coverLetterId) => {
  try {
    const { data } = await api.get(`/coverLetters/${coverLetterId}`);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const createCoverLetter = async (formData) => {
  try {
    const { data } = await api.post("/coverLetters", formData);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const updateCoverLetter = async (coverLetterId, formData) => {
  try {
    const { data } = await api.put(`/coverLetters/${coverLetterId}`, formData);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};

export const deleteCoverLetter = async (coverLetterId) => {
  try {
    await api.delete(`/coverLetters/${coverLetterId}`);
  } catch (e) {
    throw e.response?.data?.error ? new Error(e.response.data.error) : e;
  }
};
