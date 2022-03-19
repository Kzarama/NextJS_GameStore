import Layout from "../Layout";
import ListGames from "../../organisms/ListGames";
import { searchGamesApi } from "../../../assets/api/game";
import { GameInterface } from "../../../assets/interfaces/iGame";

import { size } from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";

export default function Search_template() {
  const { query } = useRouter();
  const [games, setGames] = useState<Array<GameInterface> | null>(null);

  useEffect(() => {
    document.getElementById("search-game")!.focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGamesApi(query.query as string);
        if (size(response) > 0) {
          setGames(response);
        } else {
          setGames([]);
        };
      } else {
        setGames([]);
      };
    })();
  }, [query]);

  return (
    <Layout className="search">
      {!games && query.query?.length !== 0 && <Loader active>Buscando juegos</Loader>}

      {games && size(games) === 0 && (
        <div>
          <h3>No se han encontrado juegos</h3>
        </div>
      )}

      {size(games) > 0 && (
        <ListGames games={games} />
      )}
    </Layout>
  );
};
