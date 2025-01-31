import {
  BASE_URL,
  fetchWithAuth,
  handleError,
} from "../../Auth/service/sharedApi";

// Create a new complaint
export const createComplaint = async (
  complaintData: FormData,
  centerName: string
) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/complaint/${centerName}`,
      {
        method: "POST",
         headers: { 'Content-Type': 'multipart/form-data' } ,
        body: complaintData, // FormData does not need 'Content-Type' header
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Get all complaints for a specific center
export const getAllComplaints = async (centerName: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/complaint/${centerName}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Get a specific complaint by ID and center name
export const getComplaintById = async (id: string, centerName: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/complaint/${id}/${centerName}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Update complaint status
export const updateComplaintData = async (
  id: string,
  updatedData: any,
  centerName: string
) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/complaint/status/${id}/${centerName}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
