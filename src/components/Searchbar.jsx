import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [allNames, setAllNames] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionsRef = React.useRef(null);

  useEffect(() => {
    async function fetchAllPokemonNames() {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
        );
        const data = await res.json();
        const names = data.results.map((p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          return { name: p.name, id: Number(id) };
        });

        setAllNames(names);
      } catch (err) {
        console.error("Failed to fetch Pokémon names:", err);
      }
    }
    fetchAllPokemonNames();
  }, []);

  useEffect(() => {
    if (!showSuggestions) return;
    if (selectedSuggestionIndex < 0) return;

    const listEl = suggestionsRef.current;
    if (!listEl) return;

    const items = listEl.children;
    const item = items[selectedSuggestionIndex];
    if (!item) return;

    item.scrollIntoView({ block: "nearest" });
  }, [selectedSuggestionIndex, showSuggestions]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  const handleKeyDown = (e) => {
    const suggestions = filteredSuggestions();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : -1
      );
    } else if (e.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        e.preventDefault();
        const selectedName = suggestions[selectedSuggestionIndex];
        setInputValue(selectedName);
        setShowSuggestions(false);
        onSearch(selectedName);
        setInputValue("");
        setSelectedSuggestionIndex(-1);
      }
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
    if (query.length <= 2) return [];

    return allNames.filter((p) => p.name.startsWith(query)).slice(0, 10);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={inputValue}
        onChange={(e) => handleChange(e)}
        className="search-input"
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && filteredSuggestions().length > 0 && (
        <ul className="suggestions-list" ref={suggestionsRef}>
          {filteredSuggestions().map(({ name, id }, index) => (
            <li
              className={
                index === selectedSuggestionIndex
                  ? "suggestion-item selected"
                  : "suggestion-item"
              }
              key={name}
              onClick={() => {
                setShowSuggestions(false);
                onSearch(name);
                setInputValue("");
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={name}
                className="suggestion-pokemon-image"
              />
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
