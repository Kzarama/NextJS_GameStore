import { authFetch } from "../utils/fetch";
import { BASE_PATH } from "../utils/constants";

export async function getAllFavoritesApi(idUser: string, limit: number, start: number, logout: Function) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = "_sort=createdAt:desc";
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/favorites?user=${idUser}&${limitItems}&${sortItems}&${startItems}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function isFavoriteApi(idUser: string, idGame: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function addFavoriteApi(idUser: string, idGame: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/favorites`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: idUser, game: idGame }),
    };
    return await authFetch(url, params, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function deleteFavoriteApi(idUser: string, idGame: string, logout: Function) {
  try {
    const dataFount = await isFavoriteApi(idUser, idGame, logout);
    const url = `${BASE_PATH}/favorites/${dataFount[0]._id}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await authFetch(url, params, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};
