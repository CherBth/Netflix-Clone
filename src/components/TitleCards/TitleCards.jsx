import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWI3M2ZjYzhiN2RlOTc3NDNjZTE1NGJkOGU5NjYwMiIsIm5iZiI6MTc0MDMzMzI2NS4xNzcsInN1YiI6IjY3YmI2MGQxYTRiZjFjMTkyOGJlZTQ5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mQ6Z2Ub1qmMBbdYvUfi6bdIX5zd47pymOj5T9sr8LyM",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("Wheel", handleWheel);
  }, []);
  return (
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card_list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
