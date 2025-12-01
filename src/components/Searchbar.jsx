import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    onSearch(trimmed.toLowerCase());
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: "20px", marginBottom: "10px" }}
    >
      <input
        type="text"
        placeholder="Search Pokémon (e.g. pikachu)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          padding: "10px",
          width: "70%",
          fontSize: "1.1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginRight: "8px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 16px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
