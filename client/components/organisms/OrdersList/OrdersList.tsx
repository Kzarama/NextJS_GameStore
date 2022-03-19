import OrderElement from "../../atoms/OrderElement";
import { OrderInterface } from "../../../assets/interfaces/iOrder";

import { map } from "lodash";
import { Grid } from "semantic-ui-react";

export default function OrdersList(props: { orders: Array<OrderInterface> | null }) {
  const { orders } = props;

  return (
    <Grid>
      {map(orders, (order: OrderInterface) => (
        <OrderElement key={order.id} order={order} />
      ))}
    </Grid>
  );
};
