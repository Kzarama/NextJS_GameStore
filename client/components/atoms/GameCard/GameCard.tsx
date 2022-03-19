import styles from "./GameCard.module.scss";

import { GameInterface } from "../../../assets/interfaces/iGame";

import Link from "next/link";
import { Grid, Image } from "semantic-ui-react";

export default function GameCard(props: { game: GameInterface }) {
  const { game } = props;

  return (
    <Grid.Column className={styles.gameCard__game}>
      <Link href={`/${game.url}`}>
        <a>
          <div className={styles.gameCard__gamePoster}>
            <Image src={game.poster.url} alt={game.title} />
            <div className={styles.gameCard__gamePosterInfo}>
              {game.discount ? (
                <span className={styles.discount}>-{game.discount}%</span>
              ) : <span></span>}
              <span className={styles.price}>$ {game.price}</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
};
