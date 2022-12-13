import { Card, Icon, Image } from "semantic-ui-react";
import a from "../../img/a.png";
import { useState, useEffect } from "react";
import "./content.css";

export default function Content({ data }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState("Unrated");
  const [image, setImage] = useState(a);
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [cname, setCName] = useState("");
  const [runtime, setRuntime] = useState("");

  function formatDate(date) {
    const locale = navigator.language;
    const options = {
      month: "long",
      year: "numeric",
      day: "numeric",
    };
    const d = new Date(date);
    setDate(new Intl.DateTimeFormat(locale, options).format(d));
  }

  function formatEndDate(date) {
    const locale = navigator.language;
    const options = {
      month: "long",
      year: "numeric",
      day: "numeric",
    };
    const d = new Date(date);
    setEndDate(" on " + new Intl.DateTimeFormat(locale, options).format(d));
  }

  function formatStatus(status) {
    if (status == "Running") setStatus("Ongoing");
    if (status == "Ended") setStatus(`Ended`);
  }

  function formatGenre(genre) {
    let str = "";
    for (let i = 0; i < genre.length - 1; i++) {
      str = str + genre[i] + ", ";
    }
    str = str + genre[genre.length - 1];
    setGenre(str);
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
    setSummary(summary.substring(0, summary.indexOf(".")) + ".");
  }
  useEffect(() => {
    if (data.show.name) setName(data.show.name);
    if (data.show.premiered) formatDate(data.show.premiered);
    if (data.show.summary) formatSummary(data.show.summary);
    if (data.show.rating.average)
      setRating("Rating: " + data.show.rating.average + "/10");
    if (data.show.image) setImage(data.show.image.original);
    if (data.show.ended) formatEndDate(data.show.ended);
    if (data.show.status) formatStatus(data.show.status);

    if (data.show.genres) formatGenre(data.show.genres);
    if (data.show.language) setLanguage("Language: " + data.show.language);
    if (data.show.runtime) setRuntime("Runtime: " + data.show.runtime + " min");
    if (data.show.network)
      if (data.show.country)
        if (data.show.network.country.name)
          setCName(" (" + data.show.network.country.name + ")");
  }, []);

  return (
    <div className="contentContainer">
      <div className="leftSection">
        <img src={image} alt={name} className="contentImg" />
      </div>
      <div className="rightSection">
        <div className="subright1">
          <div className="name">{name}</div>
          <div className="premier">{date}</div>
          <div className="genre">{genre}</div>
          <div className="summary">{summary}</div>
          <div className="language">{language}</div>
          <div className="runtime">{runtime}</div>

          <div className="status">
            {status}
            {endDate}
          </div>
        </div>
        <div className="subright2">
          <div className="border-top"></div>
          <div className="rating">{rating}</div>
        </div>
      </div>
    </div>
  );
}
