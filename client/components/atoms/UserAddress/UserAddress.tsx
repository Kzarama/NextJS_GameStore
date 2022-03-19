import styles from "./UserAddress.module.scss";

import { deleteAddressesApi } from "../../../assets/api/address";
import { AddressInterface } from "../../../assets/interfaces/iAddress";

import { useState } from "react";
import { Button } from "semantic-ui-react";

export default function UserAddress(props: { address: AddressInterface, logout: Function, setReloadAddresses: Function, openModal: Function }) {
  const { address, logout, setReloadAddresses, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    const response = await deleteAddressesApi(address._id, logout);
    if (response) {
      setLoadingDelete(true);
      setReloadAddresses(true);
      setLoadingDelete(false);
    };
  };

  return (
    <div className={styles.address}>
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>{address.state}, {address.city}, {address.postalCode}</p>
      <p>{address.phone}</p>
      <div className={styles.actions}>
        <Button
          className={styles.primaryButton}
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button
          className={styles.secondaryButton}
          onClick={deleteAddress}
          loading={loadingDelete}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
