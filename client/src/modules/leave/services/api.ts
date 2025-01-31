import {
  BASE_URL,
  fetchWithAuth,
  handleError,
} from "../../Auth/service/sharedApi";

// Fetch Leave data
export const fetchLeaveData = async (id: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/leaveinfo/employee/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchLeavePermit = async (id: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/leaveinfo/leavePermit/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllLeaves = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/leaveinfo/`);
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit leave form
export const submitLeaveForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/leaveinfo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(process.env.REACT_APP_API_URL + "heheheheh");
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Update Leave data
export const updateLeaveData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/leaveinfo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
