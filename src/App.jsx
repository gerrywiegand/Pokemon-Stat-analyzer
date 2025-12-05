import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import usePokemon from "./hooks/usepokemon";
import SearchBar from "./components/Searchbar";
import PokemonCard from "./components/PokemonCard";
import TypeMatrix from "./components/TypeMatrix";
import FavoritesList from "./components/FavoritesList";
import "./styles/styles.css";
import "./styles/App.css";

function HomePage({
  onSearch,
  pokemon,
  loading,
  error,
  onRandom,
  isFavorite,
  toggleFavorite,
  favorites,
  onSelectFavorite,
}) {
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
      <div className="app-status">
        {loading && <p>Loading...</p>}
        {error && <p className="app-error">{error}</p>}
      </div>
      {pokemon && (
        <PokemonCard
          pokemon={pokemon}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      )}
      <FavoritesList favorites={favorites} onSelect={onSelectFavorite} />
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
        number and view detailed statistics on base stats, type matchups,
        abilities, moves, and more. It leverages data from the PokéAPI to
        provide accurate and up-to-date information about all known Pokémon
        including Mega evolutions and regional forms. A type matchup chart is
        also included to help trainers understand the strengths and weaknesses
        of different Pokémon types in battles.
      </p>
      <p>
        Begin by typing the name, or dex number, of a pokemon you would like to
        view. There is an auto-suggest drop down to help find the mon you are
        looking for. There are three dropdown menus to view moves organized by
        category (physical, special and status) hovering over a move will
        highlighted according to type (ie. fire red) and a tooltip of the moves
        description.The analyzer will also assign a suggested role based on the
        pokemon's highest base stats.
      </p>
      <p>
        Created by a passionate Pokémon fan and developer, this tool aims to
        help trainers of all levels better understand their favorite Pokémon and
        strategize for battles in a sleek no fluff format.
      </p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

function App() {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();

  const [favorites, setFavorites] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("psa-favorites");
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });
  const isFavorite = pokemon
    ? favorites.some((fav) => fav.id === pokemon.id)
    : false;

  useEffect(() => {
    window.localStorage.setItem("psa-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite() {
    if (!pokemon) return;

    setFavorites((prev) => {
      if (isFavorite) {
        return prev.filter((fav) => fav.id !== pokemon.id);
      } else {
        const summary = {
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprite,
          types: pokemon.types,
        };
        return [...prev, summary];
      }
    });
  }

  function handleSelectFavorite(id) {
    fetchPokemon(String(id));
  }

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
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                onSelectFavorite={handleSelectFavorite}
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
