import { UserInterface } from "../interfaces/iUser";
import { authFetch, authFetch_g } from "../utils/fetch";
import { BASE_PATH, BASE_PATH_G } from "../utils/constants";
import { UserLoginInterface } from "../interfaces/iUserLogin";

export async function registerApi(formData: UserInterface) {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation CreateUser {
            createUser(input: {
              data: {
                name: "${formData.name}",
                lastname: "${formData.lastname}",
                username: "${formData.username}",
                email: "${formData.email}",
                password: "${formData.password}"
              }}) {
              user {
                id
              }
            }
          }`
      }),
    });
    const data = await response.json();
    return data.data.createUser.user;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function loginApi(formData: UserLoginInterface) {
  try {
    const response = await fetch(BASE_PATH_G, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation Register  {
            login(input: {
              identifier: "${formData.identifier}",
              password: "${formData.password}"
            }) {
              jwt
            }
          }`
      }),
    });
    const data = await response.json();
    return data.data.login;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function resetPasswordApi(email: string) {
  try {
    const url = `${BASE_PATH}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getMeApi(userId: string, logout: Function) {
  try {
    const body = JSON.stringify({
      "query": `
        query User {
          user(id: "${userId}") {
            id
            name
            lastname
            username
            email
          }
        }`,
    });
    const data = await authFetch_g(body, logout);
    return data.data.user;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function updateNameApi(userId: string, userData: { name: string, lastname: string }, logout: Function) {
  try {
    const body = JSON.stringify({
      "query": `
        mutation UpdateUser {
          updateUser (input: {
            data: {
              name: "${userData.name}",
              lastname: "${userData.lastname}"
            },
            where: {
              id: "${userId}"
            }
          }) {
            user {
              name
              lastname
            }
          }
        }`,
    });
    const data = await authFetch_g(body, logout);
    return data.data.updateUser.user;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function updateEmailApi(userId: string, email: string, logout: Function) {
  try {
    const body = JSON.stringify({
      "query": `
        mutation UpdateUser {
          updateUser (input: {
            data: {
              email: "${email}",
            },
            where: {
              id: "${userId}"
            }
          }) {
            user {
              email
            }
          }
        }`,
    });
    const data = await authFetch_g(body, logout);
    return data.data.updateUser.user;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function updatePasswordApi(idUser: string, password: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ password }),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.error(error);
    return null;
  };
};
