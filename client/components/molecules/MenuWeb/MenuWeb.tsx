import styles from "./Menu.module.scss";

import Auth from "../Auth";
import MenuCategory from "../../atoms/MenuCategory";
import ModalBasic from "../../organisms/ModalBasic";
import useAuth from "../../../assets/hooks/useAuth";
import { getMeApi } from "../../../assets/api/user";
import MenuWebOptions from "../../atoms/MenuUserOptions";
import { getPlatformsApi } from "../../../assets/api/platform";
import { UserInterface } from "../../../assets/interfaces/iUser";
import { PlatformInterface } from "../../../assets/interfaces/iPlatform";

import { map } from "lodash";
import { useEffect, useState } from "react";
import { Container, Grid } from "semantic-ui-react";

export default function MenuWeb() {
  const [platforms, setPlatforms] = useState<Array<PlatformInterface> | []>([]);
  const [user, setUser] = useState<undefined | UserInterface>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(auth.id, logout);
      setUser(response);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getPlatformsApi();
      setPlatforms(response || []);
    })();
  }, []);

  return (
    <div className={styles.menu}>
      <Container>
        <Grid>
          <Grid.Column width={6} className={styles.menu__left}>
            {map(platforms, (platform) => {
              return <MenuCategory key={platform.id} platform={platform} />
            })}
          </Grid.Column>
          <Grid.Column width={10} className={styles.menu__right}>
            {user !== undefined &&
              <MenuWebOptions
                setShowModal={setShowModal}
                user={user}
                logout={logout}
              />
            }
          </Grid.Column>
        </Grid>
      </Container>
      <ModalBasic showModal={showModal} setShowModal={setShowModal} title={titleModal} size={"small"}>
        <Auth setShowModal={setShowModal} setTitleModal={setTitleModal} />
      </ModalBasic>
    </div>
  );
};
