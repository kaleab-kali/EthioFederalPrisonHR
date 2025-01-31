import { BASE_URL, fetchWithOutAuth, handleError } from "./sharedApi";


export const createFirstTimePasswordEmployee = async ( passw: any) => {
  try {
    const data = await fetchWithOutAuth(
      `${BASE_URL}/api/employees/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passw),
      }
    );

    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }

    // const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginEmployee = async (userName: string, password: string) => {
  try {
    const data = await fetchWithOutAuth(`${BASE_URL}/api/employees/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }

    // const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const forgotPasswordRequest = async (userName: string) => {
  try {
    const data = await fetchWithOutAuth(`${BASE_URL}/api/employees/request-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName }),
    });

    // if (!response.ok) {
    //   throw new Error("Login failed");
    // }

    // const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
  }
};

