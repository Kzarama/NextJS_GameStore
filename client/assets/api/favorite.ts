import { authFetch_g } from "../utils/fetch";

export async function getAllFavoritesApi(idUser: string, limit: number, start: number, logout: Function) {
  try {
    const query_body = JSON.stringify({
      "query": `
        query GetFavorites {
          favorites (limit: ${limit}, sort: "createdAt:desc", start: ${start}, where: {user: "${idUser}"}) {
            game {
              id
              url
              title
              price
              discount
              poster {
                url
              }
            }
          }
        }`,
    });
    const data = await authFetch_g(query_body, logout);
    return data.data.favorites;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function isFavoriteApi(idUser: string, idGame: string, logout: Function) {
  try {
    const query_body = JSON.stringify({
      query: `
        query isFavorite {
          favorites (where: {user: "${idUser}", game: "${idGame}"}) {
            id
            game {
              id
              url
              title
              price
              discount
              poster {
                url
              }
            }
          }
        }`,
    });
    const data = await authFetch_g(query_body, logout);
    return data.data.favorites;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function addFavoriteApi(idUser: string, idGame: string, logout: Function) {
  try {
    var graphql = JSON.stringify({
      query: `
        mutation CreateFavorite {
          createFavorite(input: { data: { game: "${idGame}", user: "${idUser}" } }) {
            favorite {
              id
            }
          }
        }`,
    });
    return await authFetch_g(graphql, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function deleteFavoriteApi(idUser: string, idGame: string, logout: Function) {
  try {
    const dataFount = await isFavoriteApi(idUser, idGame, logout);
    var graphql = JSON.stringify({
      query: `
        mutation DeleteFavorite {
          deleteFavorite(input: { where: { id: "${dataFount[0].id}" } }) {
            favorite {
              id
            }
          }
        }`,
    });
    return await authFetch_g(graphql, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};
