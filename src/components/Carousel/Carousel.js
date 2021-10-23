import axios from "axios";
import "./carousel.css";
import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_200, noPicture } from "../../config/Config";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ params }) => {
  const [credits, setCredits] = useState();

  const getCredits = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${params.media}/${params.id}/credits?api_key=d59b0e5c750b0e983a33956c6c2fa2c0&language=en-US`
    );
    const data = response.data;
    setCredits(data.cast);
  };

  useEffect(() => {
    getCredits();
  }, []);

  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_200}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItemImg"
      />
      <b className="carouselItemName">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  return (
    <AliceCarousel
      mouseTracking
      autoPlay
      infinite
      mouseTracking
      disableDotsControls
      disableButtonsControls
      items={items}
      responsive={responsive}
    />
  );
};

export default Carousel;
