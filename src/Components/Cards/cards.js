import "./cards.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ShowCard from "./showCard";
import Spinner from "./Spinner";

import { useGetShows } from "../../hooks/useGetShows";

export default function Cards() {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { getShows, isPending } = useGetShows();

  useEffect(() => {
    const fetch = async () => {
      const res = await getShows(query);
      if (res.ok) setData(res.data);
      else if (res.error) setError(res.error);
    };
    fetch();
    // eslint-disable-next-line
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
            <ShowCard key={index} data={show.show} query={query} />
          ))}
        </ul>
      )}
    </div>
  );
}
