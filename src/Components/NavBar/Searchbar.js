import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (term === "") navigate("/");
    else navigate(`/search?q=${term}`);
    // eslint-disable-next-line
  }, [term]);

  return (
    <form
      className="searchBar"
      onSubmit={(e) => {
        e.preventDefault();
        ref.current.value = "";
      }}
    >
      <img src={require("../../img/search.png")} alt="search" />
      <input
        type="text"
        ref={ref}
        placeholder="Search..."
        onChange={(e) => {
          setTerm(e.target.value);
        }}
        required
      />
    </form>
  );
}
