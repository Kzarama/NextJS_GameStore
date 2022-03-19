import { TOKEN } from "../utils/constants";

import jwtDecode from "jwt-decode";

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
};

export function getToken() {
  return localStorage.getItem(TOKEN);
};

export function removeToken() {
  localStorage.removeItem(TOKEN);
};

export function hasExpiredToken(token: string) {
  const tokenDecode: { exp: number } = jwtDecode(token);
  const expireDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expireDate) {
    return true;
  } else {
    return false;
  };
};
