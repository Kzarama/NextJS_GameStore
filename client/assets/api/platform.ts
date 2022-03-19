import { BASE_PATH } from "../utils/constants";

export async function getPlatformsApi() {
  try {
    const url = `${BASE_PATH}/platforms?_sort=position:asc`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  };
};
