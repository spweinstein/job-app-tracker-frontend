import { api } from "./api.js";

export const createThread = async ({ docType=null, documentId=null }) => {
  try {
    const { data } = await api.post("/ai/threads", { docType, documentId });
    if (data.err || data.error) throw new Error(data.err || data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.err || e.response?.data?.error
      ? new Error(e.response.data.err || e.response.data.error)
      : e;
  }
};

export const getThreadMessages = async (threadId, params = {}) => {
  try {
    const { data } = await api.get(`/ai/threads/${threadId}/messages`, {
      params,
    });
    if (data.err || data.error) throw new Error(data.err || data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.err || e.response?.data?.error
      ? new Error(e.response.data.err || e.response.data.error)
      : e;
  }
};

export const postThreadMessage = async (threadId, text) => {
  try {
    const { data } = await api.post(`/ai/threads/${threadId}/messages`, {
      text,
    });
    if (data.err || data.error) throw new Error(data.err || data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.err || e.response?.data?.error
      ? new Error(e.response.data.err || e.response.data.error)
      : e;
  }
};

export const getThreads = async (params = {}) => {
  try {
    const { data } = await api.get("/ai/threads", { params });
    if (data.err || data.error) throw new Error(data.err || data.error);
    return data;
  } catch (e) {
    throw e.response?.data?.err || e.response?.data?.error
      ? new Error(e.response.data.err || e.response.data.error)
      : e;
  }
};