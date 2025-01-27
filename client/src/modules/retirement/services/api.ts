import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Adjust the base URL to your backend endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Retirement data
export const fetchRetirementData = async (id: string) => {
  const { data } = await api.get(`/api/retirements/${id}`);
  return data;
};

export const getAllRetirements = async () => {
  const { data } = await api.get(`/api/retirements/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitRetirementForm = async (formData: any) => {
  const { data } = await api.post("/api/retirements/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Retirement data
export const updateRetirementData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/retirements/${id}`, updatedData);
  return data;
};

export default api;
