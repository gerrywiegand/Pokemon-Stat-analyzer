import { useState } from "react";
import usePokemon from "./hooks/usepokemon";
import SearchBar from "./components/Searchbar";
import PokemonCard from "./components/PokemonCard";
import TypeMatrix from "./components/TypeMatrix";
import "./styles/styles.css";
import "./styles/App.css";

function App() {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();
  function randomPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1; // There are 1025 Pokémon as of now
    fetchPokemon(String(randomId));
  }

  return (
    <div className="app-page">
      <div className="app-container">
        <h1 className="app-title">Pokémon Stats Analyzer</h1>

        <SearchBar onSearch={fetchPokemon} />
        <button className="app-button" onClick={randomPokemon}>
          Random Pokémon
        </button>

        <p className="app-note">
          Type a Pokémon name or Dex number and hit "Search" to see its stats!
        </p>
        {loading && <p>Loading...</p>}
        {error && <p className="app-error">{error}</p>}
        {pokemon && <PokemonCard pokemon={pokemon} />}
        <TypeMatrix />
      </div>
    </div>
  );
}

export default App;
