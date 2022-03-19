import styles from "./Layout.module.scss";

import Navbar from "../../organisms/Navbar";

import classNames from "classnames";
import { Container } from "semantic-ui-react";

export default function Layout(props: { children: React.ReactNode, className: string }) {
  const { children, className } = props;

  return (
    <Container fluid className={classNames(styles.container, {
      [className]: className,
    })}>
      <Navbar />
      <Container className={styles.content}>
        {children}
      </Container>
    </Container>
  );
};
