import styles from "./Orders_template.module.scss";

import Layout from "../Layout";
import OrdersList from "../../organisms/OrdersList";
import useAuth from "../../../assets/hooks/useAuth";
import { getOrdersApi } from "../../../assets/api/order";
import { OrderInterface } from "../../../assets/interfaces/iOrder";

import { size } from "lodash";
import { useEffect, useState } from "react";

export default function Orders_template() {
  const { auth, logout } = useAuth();
  const [orders, setOrders] = useState<Array<OrderInterface> | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.id, logout);
      setOrders(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Layout className="orders" seoTitle={"GameStore - Mis pedidos"} seoDescription={undefined}>
      <div className={styles.orders_block}>
        <div className={styles.title}>Mis pedidos</div>
        <div className={styles.data}>
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Todavia no has realizado ninguna compra.
            </h2>
          ) : (
            <OrdersList orders={orders} />
          )}
        </div>
      </div>
    </Layout>
  );
};
