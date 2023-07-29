import "./../../Components/Cards/cards.css";
import { useEffect, useState } from "react";

import ShowCard from "../../Components/Cards/showCard";
import Spinner from "../../Components/Cards/Spinner";

import { useGetStarred } from "../../hooks/useGetStarred";
import images from "../../constants/images";

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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mainContainer">
      <div className="loading">
        {isPending && (
          <div className="spinner-loading">
            <Spinner />
          </div>
        )}
        {!error && data?.length > 0 && (
          <div className="result">Favourite Shows</div>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      {data?.length > 0 ? (
        <ul className="cardContainer">
          {data.map((show, index) => (
            <ShowCard key={index} data={show.data} query={"favourites"} />
          ))}
        </ul>
      ) : (
        <img style={{ filter: "invert(87%)" }} src={images.empty} />
      )}
    </div>
  );
}
