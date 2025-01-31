import {
  BASE_URL,
  fetchWithAuth,
  handleError,
} from "../../Auth/service/sharedApi";

// Fetch employee data
export const fetchEmployeeData = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/employees/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchDocumentData = async (id: string, centerName: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/documents/${id}/${centerName}`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllEmployees = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/employees`);
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Submit registration form
export const submitRegistrationForm = async (formData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/employees/`, {
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

export const submitPerformanceForm = async (
  formData: any,
  centerName: string
) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/employees/evaluation/${centerName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(process.env.REACT_APP_API_URL + "heheheheh");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const submitDocumentForm = async (
  formData: FormData,
  centerName: string
) => {
  try {
    formData.forEach((value, key) => console.log(key, value));
    const data = await fetchWithAuth(
      `${BASE_URL}/api/documents/${centerName}`,
      {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const submitFamilyForm = async (
  id: string,
  updatedData: any,
  centerName: string
) => {
  try {
    const sendData = { employeeId: id, familyRecord: updatedData };
    const data = await fetchWithAuth(
      `${BASE_URL}/api/employees/addFamilyRecord/${centerName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const submitHealthForm = async (
  id: string,
  updatedData: any,
  centerName: string
) => {
  try {
    const sendData = { employeeId: id, healthRecord: updatedData };
    const data = await fetchWithAuth(
      `${BASE_URL}/api/employees/addHealthRecord/${centerName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const submitWorkForm = async (formData: any, centerName: string) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/employees/work-experience/${centerName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(process.env.REACT_APP_API_URL + "heheheheh");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const submitTransferRequestForm = async (
  formData: any,
  centerName: string
) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/employees/transfer/request/${centerName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(process.env.REACT_APP_API_URL + "heheheheh");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const submitTransferHandle = async (
  formData: any,
  centerName: string
) => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/api/employees/transfer/handle/${centerName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(process.env.REACT_APP_API_URL + "heheheheh");
    return data;
  } catch (error) {
    handleError(error);
  }
};

// Update employee data
export const updateEmployeeData = async (id: string, updatedData: any) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/api/employees/${id}`, {
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
