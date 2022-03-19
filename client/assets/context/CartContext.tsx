import { createContext } from "react";

const CartContext = createContext({
  productsCart: 0,
  addProductCart: (product: string) => { },
  getProductsCart: () => { },
  removeProductCart: (product: string) => { },
  removeAllProductsCart: () => { },
  setReloadCart: (reloadCart: boolean) => { },
});

export default CartContext;
