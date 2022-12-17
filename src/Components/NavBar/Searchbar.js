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
  }, [term]);

  const checkSearchTerm = (term) => {
    if (
      term.charAt(term.length - 1) == "@" ||
      term.charAt(term.length - 1) == "#"
    )
      ref.current.value = term.substring(0, term.length - 1);
    else setTerm(term);
  };
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
          checkSearchTerm(e.target.value);
        }}
        required
      />
    </form>
  );
}
