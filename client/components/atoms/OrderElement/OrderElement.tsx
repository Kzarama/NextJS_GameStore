import styles from "./OrderElement.module.scss";

import ModalBasic from "../../organisms/ModalBasic";
import { OrderInterface } from "../../../assets/interfaces/iOrder";
import { AddressInterface } from "../../../assets/interfaces/iAddress";

import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { Grid, Icon, Image } from "semantic-ui-react";

export default function OrderElement(props: { order: OrderInterface }) {
  const { order } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <Grid.Column key={order.id} mobile={16} tablet={6} computer={8}>
      <div className={styles.order}>
        <div className={styles.order_info}>
          <div className={styles.order_info_data}>
            <Link href={`/${order.game.url}`}>
              <a className={styles.order_info_link}>
                <Image className={styles.order_image} src={order.game.poster.url} alt={order.game.title} />
              </a>
            </Link>
            <div>
              <h2>{order.game.title}</h2>
              <p>$ {order.totalPayment}</p>
            </div>
          </div>
          <div className={styles.order_other}>
            <p className={styles.order_other_date}>
              {moment(order.createdAt).format("L")} - {moment(order.createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal showModal={showModal} setShowModal={setShowModal} addressShipping={order.addressShipping} title={order.game.title} />
    </Grid.Column>
  );
};

function AddressModal(props: { showModal: boolean, setShowModal: Function, addressShipping: AddressInterface, title: string }) {
  const { showModal, setShowModal, addressShipping, title } = props;

  return (
    <ModalBasic
      showModal={showModal}
      setShowModal={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente dirección:</h3>
      <div>
        <p>{addressShipping.name}</p>
        <p>{addressShipping.address}</p>
        <p>
          {addressShipping.state}, {addressShipping.city}, {addressShipping.postalCode}
        </p>
        <p>{addressShipping.phone}</p>
      </div>
    </ModalBasic>
  );
};
