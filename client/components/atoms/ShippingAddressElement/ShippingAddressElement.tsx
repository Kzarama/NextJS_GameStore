import { AddressInterface } from "../../../assets/interfaces/iAddress";

import classNames from "classnames";

export default function ShippingAddressElement(props: { address: AddressInterface, addressActive: string | null, setAddressActive: Function, setAddress: Function }) {
  const { address, addressActive, setAddressActive, setAddress } = props;

  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>{address.city}, {address.state}, {address.postalCode}</p>
      <p>{address.phone}</p>
    </div>
  );
};