import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // Adjust the base URL to your backend endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch employee data
export const fetchEmployeeData = async (id: string) => {
  const { data } = await api.get(`/api/employees/${id}`);
  return data;
};

export const getAllEmployees = async () => {
  const { data } = await api.get(`/api/employees`);
  console.log(JSON.stringify(data));
  return data;
};
// Submit registration form
export const submitRegistrationForm = async (formData: any) => {
  const { data } = await api.post("/api/employees/", formData);
  console.log(process.env.REACT_APP_API_URL + "heheheheh");
  return data;
};

// Update employee data
export const updateEmployeeData = async (id: string, updatedData: any) => {
  const { data } = await api.put(`/api/employees/${id}`, updatedData);
  return data;
};

export default api;
