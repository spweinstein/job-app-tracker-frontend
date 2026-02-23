import { api } from "./api.js";

export const getCoverLetters = async (params = {}) => {
  try {
    const { data } = await api.get("/coverLetters", { params });
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const getCoverLetter = async (coverLetterId) => {
  try {
    const { data } = await api.get(`/coverLetters/${coverLetterId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const createCoverLetter = async (formData) => {
  try {
    const { data } = await api.post("/coverLetters", formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const updateCoverLetter = async (coverLetterId, formData) => {
  try {
    const { data } = await api.put(`/coverLetters/${coverLetterId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const deleteCoverLetter = async (coverLetterId) => {
  try {
    await api.delete(`/coverLetters/${coverLetterId}`);
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};
