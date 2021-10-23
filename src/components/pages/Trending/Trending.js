import React, { useState, useEffect } from "react";
import axios from "axios";
import "./trending.css";
import "../../SingleCard/SingleCard";
import SingleCard from "../../SingleCard/SingleCard";
import PaginationCustom from "../../Pagination/PaginationCustom";

function Trending() {
  const [page, setPage] = useState(1);
  const [card, setCard] = useState([]);

  useEffect(() => {
    getTrendingMovies();
  }, [page]);

  const getTrendingMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=d59b0e5c750b0e983a33956c6c2fa2c0&page=${page}`
    );

    const data = response.data;
    // console.log(data.results);
    setCard(data.results);
  };

  return (
    <>
      <div className="pageTitle">
        <h3>Trending</h3>
      </div>
      <div className="trending">
        {card.map((d) => (
          <SingleCard
            id={d.id}
            poster={d.poster_path}
            title={d.title || d.name}
            date={d.first_air_date || d.release_date}
            media_type={d.media_type}
            vote_average={d.vote_average}
          />
        ))}
      </div>
      <PaginationCustom setPage={setPage} numberOfPages="5" />
    </>
  );
}

export default Trending;
