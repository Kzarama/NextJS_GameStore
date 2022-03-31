import styles from "./Orders_template.module.scss";

import Layout from "../Layout";
import OrdersList from "../../organisms/OrdersList";
import useAuth from "../../../assets/hooks/useAuth";
import { getOrdersApi } from "../../../assets/api/order";
import { OrderInterface } from "../../../assets/interfaces/iOrder";

import { size } from "lodash";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);
  if (session == null) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  };
  return {
    props: { session },
  };
};

export default function Orders_template() {
  const { auth, logout } = useAuth();
  const [orders, setOrders] = useState<Array<OrderInterface> | null>(null);
  const { data: session, status: loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.id, logout);
      setOrders(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (!session) {
      router.replace("/");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return null;
  } else {
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
};
