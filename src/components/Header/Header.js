import { Grid } from "@material-ui/core";
import {
  Movie,
  SearchOutlined,
  Theaters,
  TrendingUp,
} from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div
      className="header"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Grid container>
        <Grid item lg={3} md={3} sm={6}>
          <NavLink className="link" to="/">
            <div className="logo">MOVIE</div>
          </NavLink>
        </Grid>
        <Grid item lg={9} md={9} sm={6}>
          <div className="menu">
            <NavLink className="link" to="/search">
              <div className="menuItem">
                <SearchOutlined className="menuIcon" />
                Search
              </div>
            </NavLink>
            <NavLink className="link" to="/movies">
              <div className="menuItem">
                <Movie className="menuIcon" /> Movies
              </div>
            </NavLink>
            <NavLink className="link" to="/series">
              <div className="menuItem">
                <Theaters className="menuIcon" />
                Series
              </div>
            </NavLink>
            <NavLink className="link" to="/">
              <div className="menuItem">
                <TrendingUp className="menuIcon" />
                Trending
              </div>
            </NavLink>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
