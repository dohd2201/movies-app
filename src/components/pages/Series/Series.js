import axios from "axios";
import React, { useState, useEffect } from "react";
import Genres from "../../Genres/Genres";
import "./series.css";
import SingleCard from "../../SingleCard/SingleCard";
import PaginationCustom from "../../Pagination/PaginationCustom";
import useGenre from "../../../hooks/useGenre";

function Series() {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const getSeries = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=d59b0e5c750b0e983a33956c6c2fa2c0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_monetization_types=flatrate`
    );
    const data = response.data;
    setSeries(data.results);
  };

  useEffect(() => {
    getSeries();
  }, [page, genreforURL]);

  // console.log(movies, "&with_genres=${genreforURL}");
  return (
    <>
      <div className="pageTitle">
        <h3>Series</h3>
      </div>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="series">
        {series.map((d) => (
          <SingleCard
            id={d.id}
            poster={d.poster_path}
            title={d.title || d.name}
            date={d.first_air_date || d.release_date}
            media_type="Series TV"
            vote_average={d.vote_average}
          />
        ))}
      </div>
      <PaginationCustom setPage={setPage} numberOfPages="50" />
    </>
  );
}

export default Series;
