import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Searchbar.css";

export default function Searchbar() {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const path = parts[parts.length - 1];

  const [term, setTerm] = useState(path);
  const navigate = useNavigate();

  useEffect(() => {
    if (term === "") navigate("/");
    else navigate(`/shows/${term}`);
  }, [term]);

  return (
    <form className="searchBar">
      <img src={require("../../img/search.png")} alt="search" />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setTerm(e.target.value);
        }}
        value={term}
        required
      />
    </form>
  );
}
