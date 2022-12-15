import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import "./content.css";

export default function Content({ data }) {
  const [viewMore, setViewMore] = useState(false);

  function handleviewMore() {
    setViewMore(true);
  }

  function handleviewLess() {
    setViewMore(false);
  }

  const initialValue = {
    name: "Title: N/A",
    id: "",
    date: "Premier: N/A",
    summary: "Summary: N/A",
    fullSummary: "Summary: N/A",
    rating: "Not Rated",
    image: require("../../img/tvshow.png"),
    status: "Status: N/A",
    endDate: "",
    genre: "Genre: N/A",
    language: "Language: N/A",
    countryName: "",
    runtime: "Runtime: N/A",
  };

  const locale = navigator.language;
  const options = {
    month: "long",
    year: "numeric",
    day: "numeric",
  };

  function formatDate(date) {
    const d = new Date(date);
    return "Premiered on " + new Intl.DateTimeFormat(locale, options).format(d);
  }

  function formatEndDate(date) {
    const d = new Date(date);
    return " on " + new Intl.DateTimeFormat(locale, options).format(d);
  }

  function formatStatus(status) {
    if (status === "Running") return "Ongoing";
    if (status === "Ended") return `Ended`;
  }

  function formatGenre(genre) {
    let str = "";
    for (let i = 0; i < genre.length - 1; i++) {
      str = str + genre[i] + ", ";
    }
    str = str + genre[genre.length - 1];
    if (str !== "undefined") return str;
  }

  function formatSummary(summary) {
    return summary
      .replaceAll("<p>", " ")
      .replaceAll("</p>", " ")
      .replaceAll("<i>", " ")
      .replaceAll("</i>", " ")
      .replaceAll(`"`, " ")
      .replaceAll("<b>", " ")
      .replaceAll("</b>", " ")
      .replaceAll("<br />", " ")
      .replaceAll("amp;", " ");
  }

  function reducer() {
    let name = "Title: N/A";
    let id = "";
    let date = "Premier: N/A";
    let summary = "Summary: N/A";
    let fullSummary = "Summary: N/A";
    let rating = "Not Rated";
    let image = require("../../img/tvshow.png");
    let status = "Status: N/A";
    let endDate = "";
    let genre = "Genre: N/A";
    let language = "Language: N/A";
    let countryName = "";
    let runtime = "Runtime: N/A";

    if (data.show.name) name = data.show.name;
    if (data.show.id) id = data.show.id;
    if (data.show.premiered) date = formatDate(data.show.premiered);
    if (data.show.summary)
      summary =
        formatSummary(data.show.summary).substring(
          0,
          Math.min(200, formatSummary(data.show.summary).length)
        ) + "...";
    if (data.show.summary) fullSummary = formatSummary(data.show.summary);
    if (data.show.rating.average)
      rating = "Rating: " + data.show.rating.average + "/10";
    if (data.show.image) image = data.show.image.original;
    if (data.show.ended) endDate = formatEndDate(data.show.ended);
    if (data.show.status) status = formatStatus(data.show.status);
    if (data.show.genres) genre = formatGenre(data.show.genres);
    if (data.show.language) language = "Language: " + data.show.language;
    if (data.show.runtime) runtime = "Runtime: " + data.show.runtime + " min";
    if (
      data.show.network &&
      data.show.network.country &&
      data.show.network.country.name
    )
      countryName = " (" + data.show.network.country.name + ")";

    return {
      name: name,
      id: id,
      date: date,
      summary: summary,
      rating: rating,
      image: image,
      status: status,
      endDate: endDate,
      genre: genre,
      language: language,
      runtime: runtime,
      countryName: countryName,
      fullSummary: fullSummary,
    };
  }

  const [show, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch();
  }, [data, viewMore]);

  return (
    <div className="contentContainer">
      <div className={viewMore ? `leftSection hidden` : `leftSection`}>
        <img src={show.image} alt={show.name} className="contentImg" />
      </div>
      <div className={viewMore ? `rightSection full-width` : `rightSection`}>
        <div className="subright1">
          <div className="name">{show.name}</div>
          <Link to={`/cast/${show.id}`}>
            <div className="cast-link">View Cast</div>
          </Link>
          <div className="premier">{show.date}</div>
          <div className="genre">{show.genre}</div>
          <div className="summary">
            {!viewMore && show.summary + " "}
            {viewMore && show.fullSummary + " "}
            {!viewMore && (
              <a className="viewMoreButton" onClick={handleviewMore}>
                view more
              </a>
            )}
            {viewMore && (
              <a className="viewMoreButton" onClick={handleviewLess}>
                view less
              </a>
            )}
          </div>
          <div className="language">
            {show.language}
            {show.countryName}
          </div>
          <div className="runtime">{show.runtime}</div>
          <div className={show.status === "Ongoing" ? `red status` : "status"}>
            {show.status}
            {show.endDate}
          </div>
        </div>
        <div className="subright2">
          <div className="border-top"></div>
          <div className="rating">{show.rating}</div>
        </div>
      </div>
    </div>
  );
}
