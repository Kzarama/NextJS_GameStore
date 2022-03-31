import styles from "./Account_template.module.scss";

import Layout from "../Layout";
import useAuth from "../../../assets/hooks/useAuth";
import { getMeApi } from "../../../assets/api/user";
import AddressesForm from "../../organisms/AddressesSection";
import { UserDataInterface } from "../../../assets/interfaces/iUserData";

import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);
  if (session == null) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  };
  return {
    props: { session },
  };
};

export default function Account_template() {
  const [user, setUser] = useState<undefined | UserDataInterface>(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (!session) {
      router.replace("/");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(session);

  return (
    <Layout className={styles.account} seoTitle={`GameStore - ${user?.name}`} seoDescription={undefined}>
      <AddressesForm />
    </Layout>
  );
};
