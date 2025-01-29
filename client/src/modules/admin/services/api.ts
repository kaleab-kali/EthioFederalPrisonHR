import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Adjust the base URL to your backend endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCenterData = async (id: string) => {
  const { data } = await api.get(`/api/centers/${id}`);
  return data;
};

export const getAllCenters = async () => {
  const { data } = await api.get(`/api/centers/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitCenterForm = async (formData: any) => {
  const { data } = await api.post("/api/centers/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Center data
export const updateCenterData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/centers/${id}`, updatedData);
  return data;
};

// Fetch Department data
export const fetchDepartmentData = async (id: string) => {
  const { data } = await api.get(`/api/org/department/${id}`);
  return data;
};

export const getAllDepartments = async () => {
  const { data } = await api.get(`/api/org/department/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitDepartmentForm = async (formData: any) => {
  const { data } = await api.post("/api/org/department/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Department data
export const updateDepartmentData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/org/department/${id}`, updatedData);
  return data;
};

export const fetchTitleData = async (id: string) => {
  const { data } = await api.get(`/api/org/title/${id}`);
  return data;
};

export const getAllTitles = async () => {
  const { data } = await api.get(`/api/org/title/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitTitleForm = async (formData: any) => {
  const { data } = await api.post("/api/org/title/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Title data
export const updateTitleData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/org/title/${id}`, updatedData);
  return data;
};

export const fetchPositionData = async (id: string) => {
  const { data } = await api.get(`/api/org/position/${id}`);
  return data;
};

export const getAllPositions = async () => {
  const { data } = await api.get(`/api/org/position/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitPositionForm = async (formData: any) => {
  const { data } = await api.post("/api/org/position/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Position data
export const updatePositionData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/org/position/${id}`, updatedData);
  return data;
};

export const fetchLeaveData = async (id: string) => {
  const { data } = await api.get(`/api/leavebalances/${id}`);
  return data;
};

export const getAllLeaves = async () => {
  const { data } = await api.get(`/api/leavebalances/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitLeaveForm = async (formData: any) => {
  const { data } = await api.post("/api/leavebalances/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Leave data
export const updateLeaveData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/leavebalances/${id}`, updatedData);
  return data;
};
export default api;
