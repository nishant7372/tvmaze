import { useEffect, useReducer } from "react";
import "./showCard.css";
import { Link } from "react-router-dom";

export default function ShowCard({ idx, data, query }) {
  const initialValue = {
    name: "Title: N/A",
    date: "Premier: N/A",
    summary: "Summary: N/A",
    rating: "Not Rated",
    image: require("../../img/tvshow.png"),
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
    let name = "Title: N/A";
    let date = "Premier: N/A";
    let summary = "Summary: N/A";
    let rating = "Not Rated";
    let image = require("../../img/tvshow.png");
    if (data.show.name) name = data.show.name;
    if (data.show.premiered) date = formatDate(data.show.premiered);
    if (data.show.summary) summary = formatSummary(data.show.summary);
    if (data.show.rating.average)
      rating = "Rating: " + data.show.rating.average + "/10";
    if (data.show.image) image = data.show.image.medium;
    return {
      name: name,
      date: date,
      summary: summary,
      rating: rating,
      image: image,
    };
  }

  const [show, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch();
  }, [data]);

  return (
    <Link
      className={`${query.length % 2 ? `link moveup-even` : `link moveup-odd`}`}
      to={`/show/${query}@${idx}`}
    >
      <div className="showCard">
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
      </div>
    </Link>
  );
}
