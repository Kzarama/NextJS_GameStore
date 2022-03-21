import styles from "./Layout.module.scss";

import Seo from "../../atoms/Seo/Seo";
import Navbar from "../../organisms/Navbar";

import classNames from "classnames";
import { Container } from "semantic-ui-react";

export default function Layout(props: { children: React.ReactNode, className: string, seoTitle: string | undefined, seoDescription: string | undefined }) {
  const { children, className, seoTitle, seoDescription } = props;

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} />
      <Container fluid className={classNames(styles.container, {
        [className]: className,
      })}>
        <Navbar />
        <Container className={styles.content}>
          {children}
        </Container>
      </Container>
    </>
  );
};
