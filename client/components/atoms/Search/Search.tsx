import styles from "./Search.module.scss";

import { useRouter } from "next/router";
import { Input } from "semantic-ui-react";
import { useEffect, useState } from "react";

export default function Search() {
  const [searchStr, setSearchStr] = useState("");
  const router = useRouter();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`);
    };
    setLoad(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  return (
    <Input
      id="search-game"
      icon={{ name: "search" }}
      className={styles.input}
      value={router.query.query}
      onChange={(_, data) => { setSearchStr(data.value) }}
    />
  );
};
