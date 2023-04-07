import "./showCard.css";

import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

export default function ShowCard({ data, query }) {
  const [checked, setChecked] = useState(false);

  const initialValue = {
    id: null,
    name: "Title: N/A",
    date: "Premier: N/A",
    summary: "Summary: N/A",
    rating: "Not Rated",
    image: `${process.env.PUBLIC_URL}/img/tvshow.png`,
  };

  function formatDate(date) {
    const locale = navigator.language;
    const options = {
      month: "long",
      year: "numeric",
      day: "numeric",
    };
    const d = new Date(date);
    return "Premiered on " + new Intl.DateTimeFormat(locale, options).format(d);
  }

  function formatSummary(summary) {
    return (
      summary
        .replaceAll("<p>", " ")
        .replaceAll("</p>", " ")
        .replaceAll("<i>", " ")
        .replaceAll("</i>", " ")
        .replaceAll(`"`, " ")
        .replaceAll("<b>", " ")
        .replaceAll("</b>", " ")
        .replaceAll("<br />", " ")
        .replaceAll("amp;", " ")
        .substring(0, Math.min(100, summary.length)) + "..."
    );
  }

  function reducer() {
    let name = initialValue.name;
    let date = initialValue.date;
    let summary = initialValue.summary;
    let rating = initialValue.rating;
    let image = initialValue.image;
    let id = initialValue.id;

    if (data.id) id = data.id;
    if (data.name) name = data.name;
    if (data.premiered) date = formatDate(data.premiered);
    if (data.summary) summary = formatSummary(data.summary);
    if (data.rating.average) rating = "Rating: " + data.rating.average + "/10";
    if (data.image) image = data.image.medium;
    setChecked(
      JSON.parse(localStorage.getItem("items")) &&
        localStorage.getItem("items").includes(id)
    );
    return {
      id,
      name,
      date,
      summary,
      rating,
      image,
    };
  }

  const [show, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch();
  }, [data]);

  const addToFav = (id) => {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    if (items.includes(id)) {
      items = items.filter((item) => item !== id);
      setChecked(false);
    } else {
      items.push(id);
      setChecked(true);
    }
    localStorage.setItem("items", JSON.stringify(items));
  };

  return (
    <div
      className={`${query.length % 2 ? `link moveup-even` : `link moveup-odd`}`}
    >
      <Link to={`/show/${query}/${show.id}`} className="link showCard">
        <div className={[`leftSection-card`]}>
          <img src={show.image} alt={show.name} className="contentImg-card" />
        </div>
        <div className="rightSection-card">
          <div className="subright1-card">
            <div className="name-card">{show.name}</div>
            <div className="card-premiere premier">{show.date}</div>
            <div className="card-summary">{show.summary}</div>
          </div>
          <div className="subright2-card">
            <div className="border-top-card"></div>
            <div className="rating">{show.rating}</div>
          </div>
        </div>
      </Link>
      <div
        className={`fav-button ${checked ? "checked" : ""}`}
        onClick={() => addToFav(show.id)}
      >
        <i className="fa-solid fa-heart"></i>
      </div>
    </div>
  );
}
