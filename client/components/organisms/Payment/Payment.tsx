import styles from "./Payment.module.scss";

import PaymentForm from "../../molecules/PaymentForm";
import { AddressInterface } from "../../../assets/interfaces/iAddress";
import { ProductInterface } from "../../../assets/interfaces/iProduct";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN!);

export default function Payment(props: { products: Array<ProductInterface>, address: AddressInterface }) {
  const { products, address } = props;

  return (
    <div className={styles.payment}>
      <div className={styles.title}>Pago</div>
      <div className={styles.data}>
        <Elements stripe={stripePromise}>
          <PaymentForm products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
};
