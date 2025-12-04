import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import usePokemon from "./hooks/usepokemon";
import SearchBar from "./components/Searchbar";
import PokemonCard from "./components/PokemonCard";
import TypeMatrix from "./components/TypeMatrix";
import PokemonHeader from "./components/PokemonHeader";
import "./styles/styles.css";
import "./styles/App.css";

function HomePage({ onSearch, pokemon, loading, error, onRandom }) {
  return (
    <>
      <h1 className="app-title">Pokémon Stats Analyzer</h1>

      <SearchBar onSearch={onSearch} />
      <button className="app-button" onClick={onRandom}>
        Random Pokémon
      </button>

      <p className="app-subtitle">
        Type a Pokémon name or Dex number and hit "Search" to see its stats!{" "}
        <br />
        Regional forms and Mega Evolutions can be found using "name-form" (e.g.
        "pikachu-rock-star" or "geodude-alola").
      </p>

      {loading && <p>Loading...</p>}
      {error && <p className="app-error">{error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}

      <TypeMatrix />
    </>
  );
}

function AboutPage() {
  return (
    <div className="about-page">
      <h2>About Pokémon Stats Analyzer</h2>
      <p>
        This application allows users to search for Pokémon by name or Dex
        number and view detailed statistics, type matchups, abilities, and more.
        It leverages data from the PokéAPI to provide accurate and up-to-date
        information about all known Pokémon including Mega evolutions and
        regional forms.
      </p>
      <p>
        Created by a passionate Pokémon fan and developer, this tool aims to
        help trainers of all levels better understand their favorite Pokémon and
        strategize for battles.
      </p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

function App() {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();

  function randomPokemon() {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    fetchPokemon(String(randomId));
  }

  return (
    <div className="app-page">
      <div className="app-container">
        <nav className="top-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSearch={fetchPokemon}
                pokemon={pokemon}
                loading={loading}
                error={error}
                onRandom={randomPokemon}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
