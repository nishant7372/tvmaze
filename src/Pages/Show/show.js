import "./show.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useGetShow } from "../../hooks/useGetShow";

import Content from "./content";
import Spinner from "../../Components/Cards/Spinner";

export default function Show() {
  const { query, id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { getShow, isPending } = useGetShow();

  useEffect(() => {
    const fetch = async (id) => {
      const res = await getShow(id);
      if (res.ok) setData(res.data);
      else if (res.error) setError(res.error);
    };
    fetch(id);
  }, [id]);

  return (
    <div className="showInfo">
      {error && <div className="error">{error}</div>}
      {isPending && (
        <div className="loading">
          <Spinner />
        </div>
      )}
      {data && <Content data={data} query={query} />}
    </div>
  );
}
