import { authFetch } from "../utils/fetch";
import { BASE_PATH } from "../utils/constants";

export async function getOrdersApi(idUser: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;
    const response = await authFetch(url, null, logout);
    if (response.statusCode === 500) {
      throw new Error(response.error);
    } else {
      return response;
    };
  } catch (error) {
    console.error(error);
    return null;
  };
};
