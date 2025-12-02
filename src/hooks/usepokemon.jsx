import { useState } from "react";

function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async (name) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found. Check spelling and try again.");
      }

      const data = await response.json();

      const abilityDetails = await Promise.all(
        data.abilities.map(async (a) => {
          try {
            const abilityRes = await fetch(a.ability.url);
            if (!abilityRes.ok) {
              throw new Error("Ability fetch failed");
            }
            const abilityData = await abilityRes.json();

            // Try to grab a good English description
            const effectEntry =
              abilityData.effect_entries.find(
                (e) => e.language.name === "en"
              ) ||
              abilityData.flavor_text_entries?.find(
                (e) => e.language.name === "en"
              );

            const description =
              effectEntry?.short_effect ||
              effectEntry?.effect ||
              effectEntry?.flavor_text ||
              "";

            return {
              name: a.ability.name,
              isHidden: a.is_hidden,
              description,
            };
          } catch (err) {
            // If ability fetch fails, still return something usable
            return {
              name: a.ability.name,
              isHidden: a.is_hidden,
              description: "",
            };
          }
        })
      );

      const formatted = {
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        artwork:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
        abilities: abilityDetails,
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
