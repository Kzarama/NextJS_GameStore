import styles from "./Cart_template.module.scss";

import Layout from "../Layout";
import Payment from "../../organisms/Payment";
import useCart from "../../../assets/hooks/useCart";
import SummaryCart from "../../organisms/SummaryCart";
import { getGameByUrlApi } from "../../../assets/api/game";
import ShippingAddress from "../../molecules/ShippingAddress";
import { AddressInterface } from "../../../assets/interfaces/iAddress";
import { ProductInterface } from "../../../assets/interfaces/iProduct";

import { useEffect, useState } from "react";

export default function Cart_template() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products! ? <EmptyCart /> : <FullCart products={products} />;
};

function EmptyCart() {
  return (
    <Layout className={styles.empty_cart} seoTitle={"GameStore - Carrito de compras"} seoDescription={undefined}>
      <h2>No hay productos en el carrito</h2>
    </Layout>
  );
};

function FullCart(props: { products: Array<string> }) {
  const { products } = props;
  const [productData, setProductData] = useState<Array<ProductInterface>>([]);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState<AddressInterface | null>(null);

  useEffect(() => {
    (async () => {
      const productsTemp: Array<ProductInterface> = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(...data);
      };
      setProductData(productsTemp);
    })();
    setReloadCart(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadCart]);

  return (
    <Layout className={styles.full_cart} seoTitle={"GameStore - Carrito de compras"} seoDescription={undefined}>
      <SummaryCart
        products={productData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
      <ShippingAddress setAddress={setAddress} />
      {address && <Payment products={productData} address={address} />}
    </Layout>
  );
};
