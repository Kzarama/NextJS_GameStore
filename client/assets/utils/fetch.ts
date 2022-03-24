import { getToken, hasExpiredToken } from "../api/token";
import { BASE_PATH_G } from "./constants";

export async function authFetch(url: string, params: { headers: object } | null, logout: Function) {
  const token = getToken();
  if (!token) {
    logout();
  } else {
    if (hasExpiredToken(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
        return error;
      };
    };
  };
};

export async function authFetch_g(body: string, logout: Function) {
  const token = getToken();
  if (!token) {
    logout();
  } else {
    if (hasExpiredToken(token)) {
      logout();
    } else {
      const paramsTemp = {
        body: body,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      try {
        const response = await fetch(BASE_PATH_G, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(error);
        return error;
      };
    };
  };
};
