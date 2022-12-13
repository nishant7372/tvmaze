import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [term]);

  return (
    <form
      className="searchBar"
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/search?q=${term}`);
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
