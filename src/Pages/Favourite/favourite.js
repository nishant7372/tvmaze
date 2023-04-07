import "./../../Components/Cards/cards.css";
import { useEffect, useState } from "react";

import ShowCard from "../../Components/Cards/showCard";
import Spinner from "../../Components/Cards/Spinner";

import { useGetStarred } from "../../hooks/useGetStarred";

export default function FavouriteShows() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { getStarred, isPending } = useGetStarred();
  useEffect(() => {
    const fetch = async () => {
      const res = await getStarred();
      if (res.ok) setData(res.data);
      else if (res.error) setError(res.error);
    };
    fetch();
  }, []);

  return (
    <div className="mainContainer">
      <div className="loading">
        {isPending && (
          <div className="spinner-loading">
            <Spinner />
          </div>
        )}
        {!error && data && <div className="result">Favourite Shows</div>}
      </div>
      {error && <div className="error">{error}</div>}
      {data && (
        <ul className="cardContainer">
          {data.map((show, index) => (
            <ShowCard key={index} data={show.data} query={"favourites"} />
          ))}
        </ul>
      )}
    </div>
  );
}
