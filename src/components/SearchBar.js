import React from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <section className="search-bar container">
      <input type="text" placeholder="Destination" />
      <input type="date" />
      <input type="date" />
      <button className="btn btn-primary">Search</button>
    </section>
  );
};

export default SearchBar;
