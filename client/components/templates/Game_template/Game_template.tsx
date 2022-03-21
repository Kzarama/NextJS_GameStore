import Layout from "../Layout";
import GameHeader from "../../atoms/GameHeader";
import TabsGame from "../../molecules/TabsGame";
import { getGameByUrlApi } from "../../../assets/api/game";
import { GameInterface } from "../../../assets/interfaces/iGame";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Game_template() {
  const { query } = useRouter();

  const [game, setGame] = useState<GameInterface | null>(null);

  useEffect(() => {
    (async () => {
      const result = await getGameByUrlApi(query.game as string);
      setGame(result[0]);
    })();
  }, [query]);

  if (!game) return null;

  return (
    <Layout className="game" seoTitle={`GameStore - ${game.title}`} seoDescription={undefined}>
      <GameHeader game={game} />
      <TabsGame game={game} />
    </Layout>
  );
};
