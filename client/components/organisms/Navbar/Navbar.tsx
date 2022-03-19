import styles from "./Navbar.module.scss";

import Menu from "../../molecules/MenuWeb";
import TopBar from "../../molecules/TopBar";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <TopBar />
      <Menu />
    </div>
  );
};
