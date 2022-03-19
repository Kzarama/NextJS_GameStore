import styles from "./ShippingAddress.module.scss";

import useAuth from "../../../assets/hooks/useAuth";
import { getAddressesApi } from "../../../assets/api/address";
import { AddressInterface } from "../../../assets/interfaces/iAddress";
import ShippingAddressElement from "../../atoms/ShippingAddressElement";

import Link from "next/link";
import { map, size } from "lodash";
import { Grid } from "semantic-ui-react";
import { useEffect, useState } from "react";

export default function ShippingAddress(props: { setAddress: Function }) {
  const { setAddress } = props;
  const [addresses, setAddresses] = useState<Array<AddressInterface> | null>(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.id, logout);
      setAddresses(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <div className={styles.shipping_address}>
      <div className={styles.title}>
        Dirección de envio
      </div>
      <div className={styles.data}>
        {size(addresses) === 0 ? (
          <h3>No hay ninguna dirección de envio creada
            <Link href="/account">
              <a> Anade tu primera dirección.</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => {
              return (<Grid.Column key={address._id} mobile={16} tablet={8} computer={4}>
                <ShippingAddressElement
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </Grid.Column>)
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};
