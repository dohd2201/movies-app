import { Pagination } from "@material-ui/lab";
import "./pagination.css";
import React from "react";

function PaginationCustom({ setPage, numberOfPages = 5 }) {
  const HanldePageChange = (page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="paginationCustom">
      <Pagination
        count={numberOfPages}
        onChange={(e) => HanldePageChange(e.target.textContent)}
        defaultPage={1}
        hideNextButton
        hidePrevButton
        color="primary"
      />
    </div>
  );
}

export default PaginationCustom;
