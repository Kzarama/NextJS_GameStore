import styles from './AddressesSection.module.scss';

import ModalBasic from '../ModalBasic';
import AddressList from '../../molecules/AddressList';
import AddressesForm from '../../molecules/AddressesForm';
import { AddressInterface } from '../../../assets/interfaces/iAddress';

import { Icon } from 'semantic-ui-react';
import { ReactElement, useState } from 'react';

export default function AddressesSection() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState<ReactElement | null>(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title: string, address: AddressInterface | null) => {
    setShowModal(true);
    setTitleModal(title);
    setFormModal(<AddressesForm setShowModal={setShowModal} setReloadAddresses={setReloadAddresses} newAddress={address ? false : true} address={address! || null} />);
  }

  return (
    <div className={styles.account__addresses}>
      <div className={styles.title__account}>
        <span>Direcciones</span>
        <Icon name="plus" link onClick={() => openModal("Nueva dirección", null)} />
      </div>
      <div className={styles.data__account}>
        <AddressList reloadAddresses={reloadAddresses} setReloadAddresses={setReloadAddresses} openModal={openModal} />
      </div>

      <ModalBasic showModal={showModal} setShowModal={setShowModal} title={titleModal}>
        {formModal}
      </ModalBasic>
    </div>
  );
};
