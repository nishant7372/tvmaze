import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShowCard from "./showCard";
import "./cards.css";
import axios from "axios";

export default function Cards() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // async function fetchData() {
  //   setIsPending(true);
  //   try {
  //     const response = await axios.get(
  //       `https://api.tvmaze.com/search/shows?q=${query}`
  //     );
  //     setData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     setError(error);
  //   }
  //   setIsPending(false);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [query]);

  useEffect(() => {
    setIsPending(true);

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((res) => res.json())
      .then((results) => {
        if (results.length == 0) {
          setError("No result found...");
          setIsPending(false);
        }
        setData(results);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [query]);

  return (
    <div className="mainContainer">
      {!error && data && (
        <div className="result">Results including "{query}"</div>
      )}
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading...</div>}
      {data && (
        <ul className="cardContainer">
          {data.map((show, index) => (
            <ShowCard key={index} idx={index} data={show} query={query} />
          ))}
        </ul>
      )}
    </div>
  );
}
