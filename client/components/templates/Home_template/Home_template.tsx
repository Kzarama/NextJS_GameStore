import styles from "./Home_template.module.scss";

import Layout from "../Layout";
import Pagination from "../../atoms/Pagination";
import ListGames from "../../organisms/ListGames/ListGames";
import { GameInterface } from "../../../assets/interfaces/iGame";
import { LIMIT_PER_PAGE } from "../../../assets/utils/constants";
import { getGamesPlatformApi, getLastGamesApi, getTotalGamesApi } from "../../../assets/api/game";

import { size } from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";

export default function Home_template(props: { isHome: boolean }) {
  const { isHome } = props;

  const { query } = useRouter();

  const [games, setGames] = useState<Array<GameInterface> | null>(null);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    (async () => {
      let response;
      if (isHome) {
        response = await getLastGamesApi(LIMIT_PER_PAGE, getStartItem());
      } else {
        response = await getGamesPlatformApi(query.platform as string, LIMIT_PER_PAGE, getStartItem());
      };
      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames(null);
      };
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    (async () => {
      const responseCount = await getTotalGamesApi();
      setTotalGames(responseCount);
    })();
  }, [query]);

  const getStartItem = () => {
    const currentPage = parseInt(query.page as string);
    if (!query.page || currentPage < 1) {
      return 0;
    } else {
      return currentPage * LIMIT_PER_PAGE - LIMIT_PER_PAGE;
    };
  };

  return (
    <Layout className={styles.home}>
      {!games && <Loader active>Cargando juegos.</Loader>}

      {games && size(games) === 0 && (
        <div><h3>No hay juegos</h3></div>
      )}

      {size(games) > 0 && <ListGames games={games} />}

      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page as string) : 1}
        />
      ) : (
        null
      )}
    </Layout>
  );
};
