import styles from "./MenuUserOptions.module.scss";

import useCart from "../../../assets/hooks/useCart";
import { MenuUserOptionsInterface } from "../../../assets/interfaces/iMenuUserOptions";

import Link from "next/link";
import { Icon, Label, Menu } from "semantic-ui-react";

export default function MenuUserOptions(props: MenuUserOptionsInterface) {
  const { setShowModal, user, logout } = props;
  const { productsCart } = useCart();

  return (
    <Menu className={styles.menu}>
      {user ? (
        <>
          <Link href="/orders" passHref={true}>
            <Menu.Item className={styles.item} as="a">
              <Icon className={styles.icon} name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist" passHref={true}>
            <Menu.Item className={styles.item} as="a">
              <Icon className={styles.icon} name="heart outline" />
              Whislist
            </Menu.Item>
          </Link>
          <Link href="/account" passHref={true}>
            <Menu.Item className={styles.item} as="a">
              <Icon className={styles.icon} name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart" passHref={true}>
            <Menu.Item as="a" className={styles.item}>
              <Icon className={styles.icon_cart} name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item onClick={() => logout()}>
            <Icon className={styles.icon_cart} name="power off" />
          </Menu.Item>
        </>
      ) :
        <Menu.Item className={styles.item} onClick={() => setShowModal(true)}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      }
    </Menu >
  );
};
