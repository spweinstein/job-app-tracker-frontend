import { api } from "./api.js";

export const getCompanies = async () => {
  try {
    const { data } = await api.get("/companies");
    if (data.err) throw new Error(data.err);
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getCompany = async (companyId) => {
  try {
    const { data } = await api.get(`/companies/${companyId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createCompany = async (formData) => {
  try {
    const { data } = await api.post("/companies", formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateCompany = async (companyId, formData) => {
  try {
    const { data } = await api.put(`/companies/${companyId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteCompany = async (companyId) => {
  try {
    const { data } = await api.delete(`/companies/${companyId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (e) {
    console.log(e);
  }
};
