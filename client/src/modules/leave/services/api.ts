import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Adjust the base URL to your backend endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Leave data
export const fetchLeaveData = async (id: string) => {
  const { data } = await api.get(`/api/leaveinfo/employee/${id}`);
  return data;
};

export const fetchLeavePermit = async (id: string) => {
  const { data } = await api.get(`/api/leaveinfo/leavePermit/${id}`);
  return data;
};

export const getAllLeaves = async () => {
  const { data } = await api.get(`/api/leaveinfo/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitLeaveForm = async (formData: any) => {
  const { data } = await api.post("/api/leaveinfo/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Leave data
export const updateLeaveData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/leaveinfo/${id}`, updatedData);
  return data;
};

export default api;
