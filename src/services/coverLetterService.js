import { api } from "./api.js";

export const getCoverLetters = async () => {
  try {
    const { data } = await api.get("/coverLetters");
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getCoverLetter = async (coverLetterId) => {
  try {
    const { data } = await api.get(`/coverLetters/${coverLetterId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createCoverLetter = async (formData) => {
  try {
    const { data } = await api.post("/coverLetters", formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateCoverLetter = async (coverLetterId, formData) => {
  try {
    const { data } = await api.put(`/coverLetters/${coverLetterId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteCoverLetter = async (coverLetterId) => {
  try {
    await api.delete(`/coverLetters/${coverLetterId}`);
  } catch (e) {
    console.log(e);
  }
};
