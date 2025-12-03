import { useState } from "react";
import usePokemon from "./hooks/usepokemon";
import SearchBar from "./components/Searchbar";
import PokemonCard from "./components/PokemonCard";
import TypeMatrix from "./components/TypeMatrix";

function App() {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();
  function randomPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1; // There are 1025 Pokémon as of now
    fetchPokemon(String(randomId));
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokémon Stats Analyzer</h1>
      <SearchBar onSearch={fetchPokemon} />
      <button style={styles.button} onClick={randomPokemon}>
        Random Pokémon
      </button>

      <p style={styles.note}>
        Type a Pokémon name or Dex number and hit "Search" to see its stats!
      </p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}
      <TypeMatrix />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "80%",
    fontSize: "1.1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  note: {
    marginTop: "20px",
    color: "#888",
  },
  result: {
    marginTop: "30px",
  },
};

export default App;
