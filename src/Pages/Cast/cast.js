import "./cast.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetShowCast } from "../../hooks/useGetShowCast";

import Spinner from "../../Components/Cards/Spinner";
import CastCard from "./castCard";

export default function Cast() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { getShowCast, isPending } = useGetShowCast();

  useEffect(() => {
    const fetch = async (id) => {
      const res = await getShowCast(id);
      if (res.ok) setData(res.data._embedded.cast);
      else if (res.error) setError(res.error);
    };
    fetch(id);
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
