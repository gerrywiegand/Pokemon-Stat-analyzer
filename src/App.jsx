import { useState } from "react";
import usePokemon from "./hooks/usepokemon";
import SearchBar from "./components/Searchbar";
import PokemonCard from "./components/PokemonCard";
import TypeChart from "./components/TypeChart";

function App() {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokémon Stats Analyzer</h1>
      <SearchBar onSearch={fetchPokemon} />

      <p style={styles.note}>
        Type a Pokémon name or Dex number and hit "Search" to see its stats!
      </p>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}
      <TypeChart />
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
