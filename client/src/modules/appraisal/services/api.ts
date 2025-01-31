import {
  BASE_URL,
  fetchWithAuth,
  handleError,
} from "../../Auth/service/sharedApi";

// Fetch Appraisal data
export const fetchAppraisalData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/appraisal/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllAppraisals = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/appraisal/all`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch Appraisal History data
export const fetchAppraisalHistoryData = async (id: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/appraisalHistory/employee/${id}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllAppraisalHistories = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/appraisalHistory/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Create Appraisal
export const createAppraisal = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/appraisal/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Appraisal History form
export const submitRegistrationForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/appraisalHistory/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Update Appraisal data
export const updateAppraisalData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/appraisal/${id}`, {
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
