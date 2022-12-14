import { useState, useEffect } from "react";
import "./showCard.css";
import { Link } from "react-router-dom";

export default function ShowCard({ idx, data, query }) {
  const [name, setName] = useState("Title: N/A");
  const [date, setDate] = useState("Premier: N/A");
  const [summary, setSummary] = useState("Summary: N/A");
  const [rating, setRating] = useState("Not Rated");
  const [image, setImage] = useState(require("../../img/tvshow.png"));

  function formatDate(date) {
    const locale = navigator.language;
    const options = {
      month: "long",
      year: "numeric",
      day: "numeric",
    };
    const d = new Date(date);
    setDate(
      "Premiered on " + new Intl.DateTimeFormat(locale, options).format(d)
    );
  }

  function formatSummary(summary) {
    summary = summary.replaceAll("<p>", " ");
    summary = summary.replaceAll("</p>", " ");
    summary = summary.replaceAll("<i>", " ");
    summary = summary.replaceAll("</i>", " ");
    summary = summary.replaceAll(`"`, " ");
    summary = summary.replaceAll("<b>", " ");
    summary = summary.replaceAll("</b>", " ") + ".";
    summary = summary.replaceAll("amp;", " ") + ".";
    setSummary(
      summary.substring(0, Math.min(100, summary.indexOf("."))) + "..."
    );
  }
  useEffect(() => {
    if (data.show.name) setName(data.show.name);
    if (data.show.premiered) formatDate(data.show.premiered);
    if (data.show.summary) formatSummary(data.show.summary);
    if (data.show.rating.average)
      setRating("Rating: " + data.show.rating.average + "/10");
    if (data.show.image) setImage(data.show.image.original);
  }, []);

  return (
    <Link className="link" to={`/show/${query}@${idx}`}>
      <div className="showCard">
        <div className="leftSection-card">
          <img src={image} alt={name} className="contentImg-card" />
        </div>
        <div className="rightSection-card">
          <div className="subright1-card">
            <div className="name-card">{name}</div>
            <div className="card-premiere premier">{date}</div>
            <div className="card-summary">{summary}</div>
          </div>
          <div className="subright2-card">
            <div className="border-top-card"></div>
            <div className="rating">{rating}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
