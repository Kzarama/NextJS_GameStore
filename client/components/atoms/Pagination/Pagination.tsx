import styles from "./Pagination.module.scss";

import { LIMIT_PER_PAGE } from "../../../assets/utils/constants";

import queryString from "query-string";
import { useRouter } from "next/router";
import { Pagination as PaginationSU } from "semantic-ui-react";

export default function Pagination(props: { totalGames: number, page: number }) {
  const { totalGames, page } = props;
  const totalPages = Math.ceil(totalGames / LIMIT_PER_PAGE);
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);

  const goToPage = (newPage: string) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };

  return (
    <div className={styles.pagination}>
      <PaginationSU
        defaultActivePage={page}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage as string)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
};
