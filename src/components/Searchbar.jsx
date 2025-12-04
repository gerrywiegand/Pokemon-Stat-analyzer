import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [allNames, setAllNames] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    async function fetchAllPokemonNames() {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
        );
        const data = await res.json();
        const names = data.results.map((p) => p.name);
        setAllNames(names);
      } catch (err) {
        console.error("Failed to fetch Pokémon names:", err);
      }
    }
    fetchAllPokemonNames();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    onSearch(trimmed.toLowerCase());
    setInputValue("");
  };

  function filteredSuggestions() {
    const query = inputValue.trim().toLowerCase();
    if (query.length > 2)
      return allNames.filter((name) => name.startsWith(query)).slice(0, 5);
    else return [];
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={inputValue}
        onChange={(e) => handleChange(e)}
        className="search-input"
      />
      {showSuggestions && filteredSuggestions().length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions().map((name) => (
            <li
              key={name}
              onClick={() => {
                setInputValue(name);
                setShowSuggestions(false);
                onSearch(name);
              }}
              className="suggestion-item"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
