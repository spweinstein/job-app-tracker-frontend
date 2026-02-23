import { api } from "./api.js";

export const getCompanies = async (params={}) => {
  try {
    const { data } = await api.get("/companies", { params });
    if (data.err) throw new Error(data.err);
    console.log(data);

    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const getCompany = async (companyId) => {
  try {
    const { data } = await api.get(`/companies/${companyId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const createCompany = async (formData) => {
  try {
    const { data } = await api.post("/companies", formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const updateCompany = async (companyId, formData) => {
  try {
    const { data } = await api.put(`/companies/${companyId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const { data } = await api.delete(`/companies/${companyId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    throw e.response?.data?.err ? new Error(e.response.data.err) : e;
  }
};
