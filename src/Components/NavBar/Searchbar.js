import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Searchbar.css";

export default function Searchbar() {
  const location = useLocation();
  const parts = location.pathname.split("/");
  let path = "";
  if (parts[1] === "show" || parts[1] === "shows") {
    path = parts[2];
  } else if (parts[3] === "cast") {
    path = parts[1];
  }
  const [term, setTerm] = useState(path);
  const navigate = useNavigate();

  useEffect(() => {
    if (parts[1] == "shows" || parts[1] === "") {
      if (term === "") navigate("/");
      else navigate(`/shows/${term}`);
    }
  }, [term]);

  return (
    <form className="searchBar">
      <img src={process.env.PUBLIC_URL + "/img/search.png"} alt="search" />
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
