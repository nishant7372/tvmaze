import { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./content.css";

export default function Content({ data, query }) {
  const [viewMore, setViewMore] = useState(false);

  const handleviewMore = () => {
    setViewMore(true);
  };

  const handleviewLess = () => {
    setViewMore(false);
  };

  const initialValue = {
    name: "Title: N/A",
    id: null,
    date: "Premier: N/A",
    summary: "Summary: N/A",
    fullSummary: "Summary: N/A",
    rating: "Not Rated",
    image: `${process.env.PUBLIC_URL}/img/tvshow.png`,
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
      str = str + genre[i] + " | ";
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
    let name = initialValue.name;
    let id = initialValue.id;
    let date = initialValue.date;
    let summary = initialValue.summary;
    let fullSummary = initialValue.fullSummary;
    let rating = initialValue.rating;
    let image = initialValue.image;
    let status = initialValue.status;
    let endDate = initialValue.endDate;
    let genre = initialValue.genre;
    let language = initialValue.language;
    let countryName = initialValue.countryName;
    let runtime = initialValue.runtime;

    if (data.name) name = data.name;
    if (data.id) id = data.id;
    if (data.premiered) date = formatDate(data.premiered);
    if (data.summary)
      summary =
        formatSummary(data.summary).substring(
          0,
          Math.min(200, formatSummary(data.summary).length)
        ) + "...";
    if (data.summary) fullSummary = formatSummary(data.summary);
    if (data.rating.average) rating = "Rating: " + data.rating.average + "/10";
    if (data.image) image = data.image.original;
    if (data.ended) endDate = formatEndDate(data.ended);
    if (data.status) status = formatStatus(data.status);
    if (data.genres) genre = formatGenre(data.genres);
    if (data.language) language = "Language: " + data.language;
    if (data.runtime) runtime = "Runtime: " + data.runtime + " min";
    if (data.network && data.network.country && data.network.country.name)
      countryName = " (" + data.network.country.name + ")";

    return {
      name,
      id,
      date,
      summary,
      rating,
      image,
      status,
      endDate,
      genre,
      language,
      runtime,
      countryName,
      fullSummary,
    };
  }

  const [show, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch();
  }, [data, viewMore]);

  return (
    <div className="contentContainer">
      <div
        className={viewMore ? `leftSection hidden zero-width` : `leftSection`}
      >
        <img src={show.image} alt={show.name} className="contentImg" />
      </div>
      <div className={viewMore ? `rightSection full-width` : `rightSection`}>
        <div className="subright1">
          <div className="name">{show.name}</div>
          <Link to={`/${query}/${show.id}/cast`}>
            <div className="cast-link">View Cast</div>
          </Link>
          <div className="premier">{show.date}</div>
          <div className="genre">{show.genre}</div>
          <div className="summary">
            {!viewMore && show.summary + " "}
            {viewMore && show.fullSummary + " "}
            {!viewMore && (
              <div className="viewMoreButton" onClick={handleviewMore}>
                view more
              </div>
            )}
            {viewMore && (
              <div className="viewMoreButton" onClick={handleviewLess}>
                view less
              </div>
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
