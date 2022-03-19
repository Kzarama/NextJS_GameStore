import '../styles/globals.scss';
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AuthContext from '../assets/context/AuthContext';
import CartContext from '../assets/context/CartContext';
import { getToken, removeToken, setToken } from '../assets/api/token';
import { addProductCart, countProductsCart, getProductsCart, removeAllProductsCart, removeProductCart } from '../assets/api/cart';

import Head from 'next/head';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { useEffect, useMemo, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState<{ token: string, id: string } | null>(null);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        id: jwtDecode<{ id: string }>(token).id,
      });
    } else {
      setAuth(null);
    };
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token: string) => {
    setToken(token);
    setAuth({
      token,
      id: jwtDecode<{ id: string }>(token).id,
    });
  };

  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    };
  };

  const authData = useMemo(
    () => ({
      auth: auth || { id: "" },
      login,
      logout,
      setReloadUser,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [auth],
  );

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (product: string) => addProduct(product),
      getProductsCart: () => getProductsCart(),
      removeProductCart: (product: string) => removeProduct(product),
      removeAllProductsCart,
      setReloadCart,
    }), [totalProductsCart],
  );

  const addProduct = (product: string) => {
    const token = getToken();
    if (token) {
      addProductCart(product);
      setReloadCart(true);
    } else {
      toast.warning("Para comprar un juego tienes que iniciar sesión.");
    };
  };

  const removeProduct = (product: string) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  if (auth === undefined) return null;

  return (
    <>
      <Head>
        <title>GameStore</title>
      </Head>
      <AuthContext.Provider value={authData}>
        <CartContext.Provider value={cartData}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default MyApp;
