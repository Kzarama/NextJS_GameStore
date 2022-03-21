import styles from "./Wishlist_template.module.scss";

import Layout from "../Layout";
import Pagination from "../../atoms/Pagination";
import ListGames from "../../organisms/ListGames";
import useAuth from "../../../assets/hooks/useAuth";
import { getTotalGamesApi } from "../../../assets/api/game";
import { GameInterface } from "../../../assets/interfaces/iGame";
import { LIMIT_PER_PAGE } from "../../../assets/utils/constants";
import { getAllFavoritesApi } from "../../../assets/api/favorite";

import { forEach, size } from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";

export default function Whislist_template() {
  const { query } = useRouter();
  const { auth, logout } = useAuth();
  const [totalGames, setTotalGames] = useState(0);
  const [games, setGames] = useState<Array<GameInterface> | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getAllFavoritesApi(auth.id, LIMIT_PER_PAGE, getStartItem(), logout);
      if (size(response) > 0) {
        let gamesList: GameInterface[] = [];
        forEach(response, (data => {
          gamesList.push(data.game);
        }));
        setGames(gamesList);
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
    <Layout className="whislist" seoTitle={"GameStore - Lista de deseos"} seoDescription={undefined}>
      <div className={styles.wishlist}>
        <div className={styles.title}>
          Lista de deseos
        </div>
        <div className={styles.data}>
          {!games && <Loader active>Cargando juegos.</Loader>}

          {games && size(games) === 0 && (
            <div className={styles.Not_found}>
              <h3>No hay juegos</h3>
            </div>
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
        </div>
      </div>
    </Layout>
  );
};
