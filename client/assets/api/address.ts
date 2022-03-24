import { authFetch_g } from "../utils/fetch";
import { AddressInterface } from "../interfaces/iAddress";

import { forEach } from "lodash";

export async function createAddressApi(address: AddressInterface, logout: Function) {
  try {
    const body = JSON.stringify({
      query: `
        mutation CreateAddress {
          createAddress (input: { data: {
              title: "${address.title}",
              name: "${address.name}",
              address: "${address.address}",
              city: "${address.city}",
              state: "${address.state}",
              postalCode: "${address.postalCode}",
              phone: "${address.phone}",
              user: "${address.user}"
            }}) {
            address {
              id
            }
          }
        }`,
    });
    const response = await authFetch_g(body, logout);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function getAddressesApi(idUser: string, logout: Function) {
  try {
    const body = JSON.stringify({
      query: `
        query Addresses {
          addresses {
            id
            title
            name
            address
            city
            state
            postalCode
            phone
            user {
              id
            }
          }
        }`,
    });
    const response = await authFetch_g(body, logout);
    if (!response.errors) {
      const responseTemp: Array<AddressInterface> = [];
      forEach(response.data.addresses, (address) => {
        if (address.user.id === idUser) {
          responseTemp.push(address);
        };
      });
      return responseTemp;
    } else {
      throw new Error(response);
    };
  } catch (error) {
    console.error(error);
    return null;
  };
};

export async function deleteAddressesApi(idAddress: string, logout: Function) {
  try {
    var graphql = JSON.stringify({
      query: `
        mutation DeleteAddress {
          deleteAddress(input: { where: { id: "${idAddress}" } }) {
            address {
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

export async function updateAddressesApi(idAddress: string, address: AddressInterface, logout: Function) {
  try {
    var graphql = JSON.stringify({
      query: `
        mutation UpdateAddress {
          updateAddress(input: { where: { id: "${idAddress}" }, data: {
              title: "${address.title}",
              name: "${address.name}",
              address: "${address.address}",
              city: "${address.city}",
              state: "${address.state}",
              postalCode: "${address.postalCode}",
              phone: "${address.phone}",
              user: "${address.user}"
            }}) {
            address {
              id
              createdAt
              updatedAt
              title
              name
              address
              city
              state
              postalCode
              phone
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
