import styles from "./MenuCategory.module.scss";

import { PlatformInterface } from "../../../assets/interfaces/iPlatform";

import Link from "next/link";
import { Menu } from "semantic-ui-react";

export default function MenuCategory(props: { platform: PlatformInterface }) {
  const { platform } = props;

  return (
    <Menu className={styles.menu}>
      <Link href={`/games/${platform.url}`} passHref={true}>
        <Menu.Item as="a" className={styles.menu_item}>
          {platform.title}
        </Menu.Item>
      </Link>
    </Menu>
  );
};
