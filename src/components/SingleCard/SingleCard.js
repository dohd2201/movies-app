import React from "react";
import { img_200, unavailable } from "../../config/Config";
import { Link } from "react-router-dom";
import "./singleCard.css";

function SingleCard({ id, poster, title, date, media_type, vote_average }) {
  return (
    <Link className="link" to={"/" + media_type + "/" + id}>
      <div className="singleCard">
        <img src={poster ? `${img_200}/${poster}` : unavailable} />
        <div className="singleCardVote">{vote_average}</div>
        <h3 className="singleCardName">{title.substring(0, 10)}</h3>
        <div className="singleCardBottom">
          <div className="singleCardType">{media_type}</div>
          <div className="singleCardDate">{date}</div>
        </div>
      </div>
    </Link>
  );
}

export default SingleCard;
