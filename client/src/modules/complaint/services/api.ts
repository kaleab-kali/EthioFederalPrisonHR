import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const createComplaint = async (complaintData: FormData) => {
  console.log("api: ", complaintData)
  const { data } = await api.post(`/api/complaint`, complaintData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
}

export const getAllComplaints = async () => {
  const { data } = await api.get(`/api/complaint`);
  return data;
};


export const updateComplaintData = async (id: string, updatedData: any) => {
  const { data } = await api.patch(`/api/complaint/status/${id}`, updatedData);
  return data;
};

export default api;
