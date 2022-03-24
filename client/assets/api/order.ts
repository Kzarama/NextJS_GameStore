import { authFetch_g } from "../utils/fetch";

export async function getOrdersApi(idUser: string, logout: Function) {
  try {
    const body = JSON.stringify({
      query: `
        query Orders {
          orders (sort: "createdAt:desc", where: {user: "${idUser}"}) {
            id
            game {
              id
              title
              price
              discount
              poster {
                url
              }
              url
            }
            user {
              id
              name
              username
              lastname
              email
            }
            totalPayment
            idPayment
            addressShipping
          }
        }`
    });
    const response = await authFetch_g(body, logout);
    return response.data.orders;
  } catch (error) {
    console.error(error);
    return null;
  };
};
