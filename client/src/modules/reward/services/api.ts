import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Adjust the base URL to your backend endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Reward data
export const fetchRewardData = async (id: string) => {
  const { data } = await api.get(`/api/salaryReward/${id}`);
  return data;
};

export const getAllRewards = async () => {
  const { data } = await api.get(`/api/salaryReward/`);
  console.log(JSON.stringify(data));
  return data;
};
export const getAllRaises = async () => {
  const { data } = await api.get(`/api/salaryRaise/`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitRewardForm = async (formData: any) => {
  const { data } = await api.post("/api/salaryReward/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update Reward data
export const updateRewardData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/salaryReward/${id}`, updatedData);
  return data;
};

export default api;
