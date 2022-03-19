import styles from "./AddressList.module.scss";

import UserAddress from "../../atoms/UserAddress";
import useAuth from "../../../assets/hooks/useAuth";
import { getAddressesApi } from "../../../assets/api/address";
import { AddressInterface } from "../../../assets/interfaces/iAddress";

import { map, size } from "lodash";
import { Grid } from "semantic-ui-react";
import { useEffect, useState } from "react";

export default function AddressList(props: { reloadAddresses: boolean, setReloadAddresses: Function, openModal: Function }) {
  const { reloadAddresses, setReloadAddresses, openModal } = props;
  const { auth, logout } = useAuth();
  const [addresses, setAddresses] = useState<AddressInterface[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth!.id, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadAddresses]);

  if (!addresses) return null;

  return (
    <div className={styles.list_address}>
      {size(addresses) === 0 ? (
        <h3>No hay ninguna dirección creada.</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => {
            return (
              <Grid.Column key={address!._id} mobile={16} tablet={8} computer={4}>
                <UserAddress address={address} logout={logout} setReloadAddresses={setReloadAddresses} openModal={openModal} />
              </Grid.Column>)
          })}
        </Grid>
      )}
    </div>
  );
};
