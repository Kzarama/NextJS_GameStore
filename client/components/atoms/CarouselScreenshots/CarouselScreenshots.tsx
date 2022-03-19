import styles from "./CarouselScreenshots.module.scss";

import { CarouselScreenshotsInterface } from "../../../assets/interfaces/iCarouselScreenshots";

import { map } from "lodash";
import Slider from "react-slick";
import { useState } from "react";
import { Image, Modal } from "semantic-ui-react";

const setting = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  swipeToSlider: true,
};

export default function CarouselScreenshots(props: CarouselScreenshotsInterface) {
  const { title, screenshots } = props;

  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState<string | null>(null);

  const openImage = (url: string) => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <>
      <Slider className={styles.carousel_screenshots} {...setting}>
        {map(screenshots, (screenshot) => {
          return (
            <Image
              key={screenshot.id}
              src={screenshot.url}
              alt={title}
              onClick={() => openImage(screenshot.url)}
            />
          )
        })}
      </Slider>
      <Modal open={showModal} onClose={() => { setShowModal(false) }} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
};
