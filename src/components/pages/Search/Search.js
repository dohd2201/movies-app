import React, { useState, useEffect } from "react";
import "./search.css";
import { TextField, Button, Tabs, Tab } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import axios from "axios";
import SingleCard from "../../SingleCard/SingleCard";
import PaginationCustom from "../../Pagination/PaginationCustom";

function Search() {
  const [type, setType] = useState();
  const [page, setPage] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const getSearchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=d59b0e5c750b0e983a33956c6c2fa2c0&query=${searchInput}&page=${page}&include_adult=false`
    );
    const data = response.data;
    setNumOfPages(data.total_pages);
    setContent(data.results);
  };

  useEffect(() => {
    getSearchMovies();
  }, [type, page]);

  console.log(searchInput);

  return (
    <div className="search">
      <div className="searchHeader">
        <div className="searchBox">
          <TextField
            fullWidth
            label="Outlined"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="searchButton"
            onClick={getSearchMovies}
          >
            <SearchOutlined />
          </Button>
        </div>
        <div className="searchType">
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            <Tab style={{ width: "30%" }} label="Search Movies" />
            <Tab style={{ width: "30%" }} label="Search Series" />
          </Tabs>
        </div>
      </div>
      <div className="searchBody">
        {content &&
          content.map((c) => (
            <SingleCard
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchInput &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <PaginationCustom setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Search;
