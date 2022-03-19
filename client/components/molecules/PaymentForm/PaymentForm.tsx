import styles from "./PaymentForm.module.scss";

import useAuth from "../../../assets/hooks/useAuth";
import useCart from "../../../assets/hooks/useCart";
import { paymentCartApi } from "../../../assets/api/cart";
import { AddressInterface } from "../../../assets/interfaces/iAddress";
import { ProductInterface } from "../../../assets/interfaces/iProduct";

import { size } from "lodash";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function PaymentForm(props: { products: Array<ProductInterface>, address: AddressInterface }) {
  const { products, address } = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();
  const { removeAllProductsCart, setReloadCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return null;
    };
    const cardGetElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardGetElement!);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      const response = await paymentCartApi(
        result.token,
        products,
        auth.id,
        address,
        logout,
      );
      if (size(response) > 0) {
        toast.success("Pedido completado");
        removeAllProductsCart();
        setReloadCart(true);
        router.push("/orders");
      } else {
        toast.error("Error al realizar el pedido");
      };
    };
    setLoading(false);
  };

  return (
    <form className={styles.payment_form} onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" className={styles.payment_button} loading={loading} disabled={!stripe}>Pagar</Button>
    </form>
  );
};
