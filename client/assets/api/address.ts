import { authFetch } from "../utils/fetch";
import { BASE_PATH } from "../utils/constants";
import { AddressInterface } from "../interfaces/iAddress";

export async function createAddressApi(address: object, logout: Function) {
  try {
    const url = `${BASE_PATH}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    return await authFetch(url, params, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getAddressesApi(idUser: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/addresses?user=${idUser}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function deleteAddressesApi(idAddress: string, logout: Function) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
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

export async function updateAddressesApi(idAddress: string, address: AddressInterface, logout: Function) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    return await authFetch(url, params, logout);
  } catch (error) {
    console.error(error);
    return null;
  };
};
