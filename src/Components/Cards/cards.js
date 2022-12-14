import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShowCard from "./showCard";
import "./cards.css";
import Spinner from "./Spinner";
// import axios from "axios";

export default function Cards() {
  // const alertUser = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //   };
  // }, []);

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
        } else {
          setError(null);
        }
        setData(results);
        // console.log(results);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [query]);

  return (
    <div className="mainContainer">
      <div className="loading">
        {isPending && (
          <div className="spinner-loading">
            <Spinner />
          </div>
        )}
        {!error && data && (
          <div className="result">Results including "{query}"</div>
        )}
      </div>
      {error && <div className="error">{error}</div>}
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
