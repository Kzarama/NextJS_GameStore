import styles from "./SummaryCart.module.scss";

import useCart from "../../../assets/hooks/useCart";
import { ProductInterface } from "../../../assets/interfaces/iProduct";

import { forEach, map } from "lodash";
import { useEffect, useState } from "react";
import { Icon, Image, Table } from "semantic-ui-react";

export default function SummaryCart(props: { products: Array<ProductInterface>, reloadCart: boolean, setReloadCart: Function }) {
  const { products, reloadCart, setReloadCart } = props;
  const { removeProductCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, reloadCart]);

  const removeProduct = (product: string) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  return (
    <div className={styles.summary_cart}>
      <div className={styles.title}>
        Resumen del carrito:
      </div>
      <div className={styles.data}>
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => {
              return (
                <Table.Row key={product.id} className={styles.table_product}>
                  <Table.Cell>
                    <Icon
                      name="close"
                      link
                      onClick={() => removeProduct(product.url)}
                    />
                    <Image src={product.poster.url} alt={product.title} />
                    {product.title}
                  </Table.Cell>
                  <Table.Cell>{product.platform.title}</Table.Cell>
                  <Table.Cell>Inmediata</Table.Cell>
                  <Table.Cell>$ {product.price}</Table.Cell>
                </Table.Row>
              )
            })}
            <Table.Row className={styles.cart_resume}>
              <Table.Cell className={styles.cart_clear} />
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className={styles.total_price}>$ {(totalPrice).toFixed(2)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
