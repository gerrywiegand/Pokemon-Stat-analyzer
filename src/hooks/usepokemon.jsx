import { useState } from "react";

function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (name) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error("Pokémon not found. Check spelling and try again.");
      }

      const data = await response.json();

      const formatted = {
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
        stats: data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      };

      setPokemon(formatted);
    } catch (err) {
      setError(err.message || "An error occurred while fetching Pokémon data.");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, loading, error, fetchPokemon };
}

export default usePokemon;
