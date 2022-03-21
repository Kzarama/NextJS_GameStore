import styles from "./Account_template.module.scss";

import Layout from "../Layout";
import useAuth from "../../../assets/hooks/useAuth";
import { getMeApi } from "../../../assets/api/user";
import ChangeNameForm from "../../molecules/ChangeNameForm";
import AddressesForm from "../../organisms/AddressesSection";
import ChangeEmailForm from "../../molecules/ChangeEmailForm";
import ChangePasswordForm from "../../molecules/ChangePasswordForm";
import { UserDataInterface } from "../../../assets/interfaces/iUserData";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Account_template() {
  const [user, setUser] = useState<undefined | UserDataInterface>(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  };

  return (
    <Layout className={styles.account} seoTitle={`GameStore - ${user.name} ${user.lastname}`} seoDescription={undefined}>
      <div className={styles.account__configuration}>
        <div className={styles.title__account}><span>Configuración</span></div>
        <div className={styles.data__account}>
          <ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser} />
          <ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser} />
          <ChangePasswordForm user={user} logout={logout} />
        </div>
      </div>
      <AddressesForm />
    </Layout>
  );
};
