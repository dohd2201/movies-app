import axios from "axios";
import React, { useState, useEffect } from "react";
import "./genres.css";
import Chip from "@material-ui/core/Chip";

function Genres({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) {
  const handleSelectedGenres = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((d) => d.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const getGenres = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=d59b0e5c750b0e983a33956c6c2fa2c0&language=en-US`
    );
    const data = response.data;
    setGenres(data.genres);
  };

  // console.log(genres);

  useEffect(() => {
    getGenres();
    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div className="genres">
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 5 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 5 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleSelectedGenres(genre)}
        />
      ))}
    </div>
  );
}

export default Genres;
