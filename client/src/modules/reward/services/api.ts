import {
  BASE_URL,
  fetchWithAuth,
  handleError,
} from "../../Auth/service/sharedApi";

// Fetch Reward data
export const fetchRewardData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryReward/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllRewards = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryReward/`);
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllRaises = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryRaise/`);
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit reward form
export const submitRewardForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryReward/`, {
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

// Update Reward data
export const updateRewardData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryReward/${id}`, {
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
