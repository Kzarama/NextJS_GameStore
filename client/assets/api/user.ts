import { authFetch } from "../utils/fetch";
import { BASE_PATH } from "../utils/constants";

export async function registerApi(formData: object) {
  try {
    const url = `${BASE_PATH}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function loginApi(formData: object) {
  try {
    const url = `${BASE_PATH}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function resetPasswordApi(email: string) {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getMeApi(logout: Function) {
  try {
    const url = `${BASE_PATH}/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function updateNameApi(idUser: string, data: object, logout: Function) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function updateEmailApi(idUser: string, email: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function updatePasswordApi(idUser: string, password: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.error(error);
    return null;
  };
};
