import React from "react";
import StatBars from "./StatBars";
import typeColors from "../utils/typeColors";
import { getWeaknessesForTypes } from "../utils/typeMatchups";
import PokemonMoves from "./moves";
import PokemonHeader from "./PokemonHeader";

const cardStyles = {
  backgroundColor: "#f7f9fc",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  width: "100%",
  maxWidth: "800px",
  margin: "20px auto",
};

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;
  const { id, name, sprite, artwork, types, abilities, stats, moves } = pokemon;
  const { physicalMoves, specialMoves, statusMoves } = moves || {};

  const weaknesses = getWeaknessesForTypes(types);

  return (
    <div style={cardStyles}>
      <PokemonHeader
        id={id}
        name={name}
        sprite={sprite}
        artwork={artwork}
        types={types}
        stats={stats}
        abilities={abilities}
      />

      {/* Stats */}
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3 style={{ marginBottom: "10px" }}>Base Stats</h3>
        <StatBars stats={stats} />
      </div>
      {/* Weaknesses */}
      {weaknesses && weaknesses.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3 style={{ marginBottom: "8px" }}>Weaknesses</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {weaknesses.map((w) => {
              const bg = typeColors[w.type] || "#e5e7eb";
              const tooltip = `${name} takes ${w.multiplier}x damage from ${w.type}-type moves.`;
              return (
                <span
                  title={tooltip}
                  key={w.type}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    backgroundColor: bg,
                    color: "#fff",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {w.type}
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "0.75rem",
                      backgroundColor: "rgba(0,0,0,0.25)",
                      padding: "1px 6px",
                      borderRadius: "999px",
                    }}
                  >
                    {w.multiplier}x
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      <PokemonMoves
        physicalMoves={physicalMoves}
        specialMoves={specialMoves}
        statusMoves={statusMoves}
      />
    </div>
  );
}

export default PokemonCard;
