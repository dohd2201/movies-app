import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { unavailable, img_500 } from "../../config/Config";
import "./movieInfo.css";
import { Button } from "@material-ui/core";
import { YouTube } from "@material-ui/icons";
import Carousel from "../Carousel/Carousel";

function MovieInfo() {
  const [info, setInfo] = useState();
  const [video, setVideo] = useState();
  const params = useParams();
  console.log(params);

  const getInfo = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${params.media}/${params.id}?api_key=d59b0e5c750b0e983a33956c6c2fa2c0&language=en-US`
    );
    const data = response.data;
    setInfo(data);
  };

  const getVideo = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${params.media}/${params.id}/videos?api_key=d59b0e5c750b0e983a33956c6c2fa2c0&language=en-US`
    );
    const data = response.data;
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    getInfo();
    getVideo();
  }, []);

  return (
    <>
      <div className="pageTitle">
        <h3>Information</h3>
      </div>

      {info && (
        <div className="movieInfo">
          <div className="movieInfoImg">
            <img
              className="movieInfoBackdrop"
              src={
                info.backdrop_path
                  ? `${img_500}/${info.backdrop_path}`
                  : unavailable
              }
            />
          </div>
          <div className="movieInfoAbout">
            <span className="movieInfoTitle aboutItem">
              {info.name || info.title} (
              {(info.first_air_date || info.release_date || "-----").substring(
                0,
                4
              )}
              )
            </span>
            <span className="movieInfoDescription  aboutItem">
              {info.overview}
            </span>
            <Carousel className="aboutItem" params={params} />
            <Button
              variant="contained"
              startIcon={<YouTube />}
              color="secondary"
              target="__blank"
              href={`https://www.youtube.com/watch?v=${video}`}
              className="aboutItem"
            >
              Watch the Trailer
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieInfo;
