import { BASE_PATH } from "../utils/constants";

export async function getLastGamesApi(limit: number, start: number) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = "_sort=createdAt:desc";
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/games?${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getGamesPlatformApi(platform: string, limit: number, start: number) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = "_sort=createdAt:desc";
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getTotalGamesApi() {
  try {
    const url = `${BASE_PATH}/games/count`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getTotalGamesPlatformApi(platform: string) {
  try {
    const url = `${BASE_PATH}/games/count?platform.url=${platform}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getGameByUrlApi(path: string) {
  try {
    const url = `${BASE_PATH}/games?url=${path}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function searchGamesApi(title: string) {
  try {
    const url = `${BASE_PATH}/games?_q=${title}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};
