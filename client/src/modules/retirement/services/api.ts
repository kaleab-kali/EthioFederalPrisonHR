import {
  BASE_URL,
  fetchWithAuth,
  handleError,
} from "../../Auth/service/sharedApi";

// Fetch Retirement data
export const fetchRetirementData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/retirements/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllRetirements = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/retirements/`);
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit retirement form
export const submitRetirementForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/retirements/`, {
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

// Update Retirement data
export const updateRetirementData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/retirements/${id}`, {
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
