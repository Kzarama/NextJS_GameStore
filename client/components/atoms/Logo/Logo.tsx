import style from "./Logo.module.scss";

import Link from "next/link";
import { Image } from "semantic-ui-react";

export default function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="Logo" className={style.img} />
      </a>
    </Link>
  );
};
