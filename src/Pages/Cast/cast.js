import "./cast.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/Cards/Spinner";
import CastCard from "./castCard";

export default function Cast() {
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // console.log(id);
  useEffect(() => {
    setIsPending(true);

    fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      .then((res) => res.json())
      .then((results) => {
        if (results.length === 0) {
          setError("No result found...");
          setIsPending(false);
        } else setError(null);
        setData(results._embedded.cast);
        // console.log(results);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  return (
    <div className="mainContainer">
      <div className="loading">
        {isPending && (
          <div className="spinner-loading">
            <Spinner />
          </div>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      {!error && data && <div className="result">Cast</div>}
      {data && (
        <ul className="castContainer">
          {data.map((character, index) => (
            <CastCard key={index} data={character} />
          ))}
        </ul>
      )}
    </div>
  );
}
