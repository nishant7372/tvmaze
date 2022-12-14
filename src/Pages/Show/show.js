import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Content from "./content";
import "./show.css";
export default function Show() {
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  function getQuery(id) {
    return id.substring(0, id.indexOf("@"));
  }
  function getIndex(id) {
    return parseInt(id.substring(id.indexOf("@") + 1, id.length));
  }

  useEffect(() => {
    setIsPending(true);

    fetch(`https://api.tvmaze.com/search/shows?q=${getQuery(id)}`)
      .then((res) => res.json())
      .then((results) => {
        if (results.length == 0) {
          setError("No result found...");
          setIsPending(false);
        }
        setData(results[getIndex(id)]);
        // console.log(results);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  return <div className="showInfo">{data && <Content data={data} />}</div>;
}
