import styles from "./TabsGame.module.scss";

import GameInfo from "../../atoms/GameInfo";
import { GameInterface } from "../../../assets/interfaces/iGame";

import { Tab } from "semantic-ui-react";

export default function TabsGame(props: { game: GameInterface }) {
  const { game } = props;

  const panes = [
    {
      menuItem: "Información",
      render: () => (
        <Tab.Pane>
          <GameInfo game={game} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Comentarios",
      render: () => (
        <Tab.Pane>
          <h1>Comentarios del juego</h1>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab className={styles.tabs_game} panes={panes} />
  );
};
