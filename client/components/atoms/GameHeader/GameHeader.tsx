import styles from "./GameHeader.module.scss";

import useAuth from "../../../assets/hooks/useAuth";
import useCart from "../../../assets/hooks/useCart";
import { addFavoriteApi } from "../../../assets/api/favorite";
import { GameInterface } from "../../../assets/interfaces/iGame";
import { deleteFavoriteApi, isFavoriteApi } from "../../../assets/api/favorite";

import { size } from "lodash";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, Grid, Icon, Image } from "semantic-ui-react";

export default function GameHeader(props: { game: GameInterface }) {
  const { game } = props;

  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth!.id, game.id, logout);
      if (size(response) > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      };
    })();
    setReloadFavorite(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, reloadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.id, game.id, logout);
      setReloadFavorite(true);
    };
  };

  const deleteFavorite = async () => {
    if (auth) {
      await deleteFavoriteApi(auth.id, game.id, logout);
      setReloadFavorite(true);
    };
  };

  return (
    <Grid className={styles.header_game}>
      <Grid.Column mobile={16} tablet={16} computer={10}>
        <div className={styles.title}>
          {game.title}
          <Icon
            link
            name={isFavorite ? "heart" : "heart outline"}
            onClick={isFavorite ? () => deleteFavorite() : () => addFavorite()}
            className={classNames({
              like: isFavorite,
              iconHeart: true,
            })}
          />
        </div>
        <div className={styles.delivery}>Entrega en 24/48 h</div>
        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className={styles.buy}>
          <div className={styles.price}>
            <p>Precio de venta al público: $ {game.price}</p>
            {game.discount != 0 &&
              <div className={styles.price_actions}>
                <p>-{game.discount}%</p>
                <p>$ {(game.price - Math.floor(game.price * game.discount) / 100).toFixed(2)}</p>
              </div>
            }
          </div>
          <Button
            className={styles.buy_btn}
            onClick={() => addProductCart(game.url)}
          >
            Comprar
          </Button>
        </div>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Image src={game.poster.url} alt={game.title} />
      </Grid.Column>
    </Grid>
  );
};
