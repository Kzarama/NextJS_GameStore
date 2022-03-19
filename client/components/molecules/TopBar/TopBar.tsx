import styles from "./TopBar.module.scss";

import Search from "../../atoms/Search";
import Logo from "../../atoms/Logo/Logo";

import { Container, Grid } from "semantic-ui-react";

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      <Container>
        <Grid className={styles.topbar}>
          <Grid.Column width={8} className={styles.topbar__left}>
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className={styles.topbar__right}>
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};
