import styles from "./ListGames.module.scss";

import GameCard from "../../atoms/GameCard";
import useWindowSize from "../../../assets/hooks/useWindowSize";
import { GameInterface } from "../../../assets/interfaces/iGame";
import { breakpointUpLg, breakpointUpMd, breakpointUpSm } from "../../../assets/utils/breakpoints";

import { map } from "lodash";
import { Grid } from "semantic-ui-react";

export default function ListGames(props: { games: GameInterface[] | null }) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width! > breakpointUpLg:
        return 5;
      case width! > breakpointUpMd:
        return 3;
      case width! > breakpointUpSm:
        return 2;
      default:
        return 1;
    };
  };

  return (
    <div className={styles.list_games}>
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game => {
            return (
              <GameCard key={game.id} game={game} />
            );
          }))}
        </Grid.Row>
      </Grid>
    </div>
  );
};
