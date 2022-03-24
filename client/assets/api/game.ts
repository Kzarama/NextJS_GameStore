import { BASE_PATH_G } from "../utils/constants";
import { GameInterface } from "../interfaces/iGame";

import { forEach } from "lodash";

export async function getLastGamesApi(limit: number, start: number) {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "query": `
          query GetLastGames {
            games (limit: ${limit}, sort: "createdAt:desc", start: ${start}) {
              id
              url
              title
              price
              discount
              poster {
                url
              }
            }
          }`
      }),
    });
    const data = await response.json();
    return data.data.games;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getGamesPlatformApi(platform: string, limit: number, start: number) {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "query": `
          query GetGamesPlatform {
            games (limit: ${limit}, sort: "createdAt:desc", start: ${start}) {
              id
              url
              title
              price
              discount
              platform {
                url
              }
              poster {
                url
              }
            }
          }`
      }),
    });
    const data = await response.json();
    if (!data.errors) {
      const responseTemp: Array<GameInterface> = [];
      forEach(data.data.games, (game) => {
        if (game.platform.url === platform) {
          responseTemp.push(game);
        };
      });
      return responseTemp;
    } else {
      throw new Error(data);
    };
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getTotalGamesApi() {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "query": `
          query GetAllGames {
            games {
              title
            }
          }`
      }),
    });
    const data = await response.json();
    return data.data.games.length;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getTotalGamesPlatformApi(platform: string) {
  try {
    return getGamesPlatformApi.length;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getGameByUrlApi(path: string) {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "query": `
          query GetGameByUrl {
            games (where:{url: "${path}"}) {
              id
              url
              title
              summary
              releaseDate
              price
              discount
              video
              poster {
                url
              }
              screenshots {
                url
              }
              platform {
                url
              }
            }
          }`
      }),
    });
    const data = await response.json();
    return data.data.games;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function searchGamesApi(title: string) {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query SearchGames {
            games (where:{_q: "${title}"}) {
              id
              title
              summary
              releaseDate
              url
              price
              discount
              video
              poster {
                url
              }
              screenshots {
                url
              }
              platform {
                url
              }
            }
          }`
      }),
    });
    const data = await response.json();
    return data.data.games;
  } catch (error) {
    console.error(error);
    return null;
  };
};
