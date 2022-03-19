import styles from "./GameInfo.module.scss";

import { GameInterface } from "../../../assets/interfaces/iGame";
import CarouselScreenshots from "../../atoms/CarouselScreenshots";

import "moment/locale/es";
import moment from "moment";
import ReactPlayer from "react-player/lazy";

export default function GameInfo(props: { game: GameInterface }) {
  const { game } = props;

  return (
    <div className={styles.info_game}>
      <CarouselScreenshots title={game.title} screenshots={game.screenshots} />
      <ReactPlayer
        className={styles.game_video}
        url={game.video}
        controls={true}
      />
      <div className={styles.game_content}>
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className={styles.content_date}>
          <h4>Fecha de lanzamiento: </h4>
          <p>{moment(game.releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
};
