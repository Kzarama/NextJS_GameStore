import { authFetch } from "../utils/fetch";
import { BASE_PATH, CART } from "../utils/constants";
import { ProductInterface } from "../interfaces/iProduct";
import { AddressInterface } from "../interfaces/iAddress";

import { toast } from "react-toastify";
import { includes, remove, size } from "lodash";

export function getProductsCart() {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem(CART);
    if (!cart) {
      return null;
    } else {
      return cart.split(",");
    };
  };
};

export function addProductCart(product: string) {
  const cart = getProductsCart();
  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("Este producto ya está añadido al carrito")
    } else {
      cart.push(product);
      localStorage.setItem(CART, `${cart}`);
      toast.success("Producto añadido al carrito");
    };
  };
};

export function countProductsCart() {
  const cart = getProductsCart();
  if (!cart) {
    return 0;
  } else {
    return size(cart);
  };
};

export function removeProductCart(product: string) {
  const cart = getProductsCart();
  remove(cart!, (productItem) => {
    return productItem === product;
  });
  if (size(cart) > 0) {
    localStorage.setItem(CART, `${cart}`);
  } else {
    localStorage.removeItem(CART);
  };
};

export function removeAllProductsCart() {
  localStorage.removeItem(CART);
};

export async function paymentCartApi(token: object, products: ProductInterface[], idUser: string, address: AddressInterface, logout: Function) {
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createdAt;
    const url = `${BASE_PATH}/orders`;
    const params = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  };
};
