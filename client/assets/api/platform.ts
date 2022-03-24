import { BASE_PATH_G } from "../utils/constants";

export async function getPlatformsApi() {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "query": `
        query GetPlatforms {
          platforms {
            id
            title
            url
            position
          }
        }`
      }),
    });
    const data = await response.json();
    return data.data.platforms;
  } catch (error) {
    console.error(error);
  };
};
