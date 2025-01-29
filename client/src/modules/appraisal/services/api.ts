import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Adjust the base URL to your backend endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Appraisal data
export const fetchAppraisalData = async (id: string) => {
  const { data } = await api.get(`/api/appraisal/${id}`);
  return data;
};

export const getAllAppraisals = async () => {
  const { data } = await api.get(`/api/appraisal/all`);
  console.log(JSON.stringify(data));
  return data;
};

export const fetchAppraisalHistoryData = async (id: string) => {
  const { data } = await api.get(`/api/appraisalHistory/employee/${id}`);
  return data;
};

export const getAllAppraisalHistories = async () => {
  const { data } = await api.get(`/api/appraisalHistory/`);
  console.log(JSON.stringify(data));
  return data;
};
export const createAppraisal = async (formData: any) => {
  const { data } = await api.post("/api/appraisal/");
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};
// Submit registration form
export const submitRegistrationForm = async (formData: any) => {
  const { data } = await api.post("/api/appraisalHistory/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Appraisal data
export const updateAppraisalData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/appraisal/${id}`, updatedData);
  return data;
};

export default api;
