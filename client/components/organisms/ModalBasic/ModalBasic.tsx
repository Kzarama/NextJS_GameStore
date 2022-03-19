import styles from "./ModalBasic.module.scss";

import { Icon, Modal } from "semantic-ui-react";

export default function ModalBasic(props: any) {
  const { showModal, setShowModal, title, children, ...rest } = props;

  const onClose = () => setShowModal(false);

  return (
    <Modal className={styles.basic_modal} open={showModal} onClose={onClose} {...rest}>
      <Modal.Header className={styles.header}>
        <span>{title}</span><Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  );
};
