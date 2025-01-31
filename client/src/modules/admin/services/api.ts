import { BASE_URL, fetchWithAuth, handleError } from "../../Auth/service/sharedApi";

// Fetch Center data
export const fetchCenterData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/centers/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllCenters = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/centers/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const submitChangeRole = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/employees/change-role`, {
      method: "PUT",
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

export const submitAddPassword = async (formData: any, centerName: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/employees/assign-credentials/${centerName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const submitChangePassword = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/employees/change-password`, {
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
// Submit Center form
export const submitCenterForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/centers/`, {
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

// Update Center data
export const updateCenterData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/centers/${id}`, {
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

// Fetch Department data
export const fetchDepartmentData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/department/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllDepartments = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/department/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Department form
export const submitDepartmentForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/department/`, {
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

// Update Department data
export const updateDepartmentData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/department/${id}`, {
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

// Fetch Title data
export const fetchTitleData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/title/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllTitles = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/title/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Title form
export const submitTitleForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/title/`, {
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

// Update Title data
export const updateTitleData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/title/${id}`, {
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

// Fetch Position data
export const fetchPositionData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/position/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllPositions = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/position/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Position form
export const submitPositionForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/position/`, {
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

// Update Position data
export const updatePositionData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/org/position/${id}`, {
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

// Fetch Leave data
export const fetchLeaveData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/leavebalances/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllLeaves = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/leavebalances/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Leave form
export const submitLeaveForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/leavebalances/`, {
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

// Update Leave data
export const updateLeaveData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/leavebalances/${id}`, {
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

// Fetch Salary Limit data
export const fetchSalaryLimitData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryLimit/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllSalaryLimit = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryLimit/`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit Salary Limit form
export const submitSalaryLimitForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryLimit/`, {
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

// Update Salary Limit data
export const updateSalaryLimitData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/salaryLimit/${id}`, {
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
