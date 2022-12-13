import { useState, useEffect } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "./showCard.css";
import a from "../../img/a.png";
import { Link } from "react-router-dom";

export default function ShowCard({ idx, data, query }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState("Unrated");
  const [image, setImage] = useState(a);

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
  }, []);

  return (
    <Link to={`/show/${query}@${idx}`}>
      <Card className="showCard">
        <Image src={image} wrapped ui={false} className="img" />
        <Card.Content>
          <Card.Header className="name">{name}</Card.Header>
          <Card.Meta>
            <span className="date">Premiered on {date}</span>
          </Card.Meta>
          <Card.Description className="white">{summary}</Card.Description>
        </Card.Content>
        <div className="border-top"></div>
        <Card.Content extra className="yellow">
          {rating}
        </Card.Content>
      </Card>
    </Link>
  );
}
