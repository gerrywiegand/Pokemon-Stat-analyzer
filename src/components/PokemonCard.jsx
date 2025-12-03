import React from "react";
import StatBars from "./StatBars";
import typeColors from "../utils/typeColors";
import { getWeaknessesForTypes } from "../utils/typeMatchups";
import PokemonMoves from "./moves";
import PokemonHeader from "./PokemonHeader";
import "../styles/PokemonCard.css";

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;
  const { id, name, sprite, artwork, types, abilities, stats, moves } = pokemon;
  const { physicalMoves, specialMoves, statusMoves } = moves || {};

  const weaknesses = getWeaknessesForTypes(types);

  return (
    <div className="pokemon-card">
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
      <div className="pokemon-card-stats">
        <h3 className="card-section-title">Base Stats</h3>
        <StatBars stats={stats} />
      </div>
      {/* Weaknesses */}
      {weaknesses && weaknesses.length > 0 && (
        <div className="pokemon-card-weaknesses">
          <h3 className="card-section-title">Weaknesses</h3>
          <div className="weaknesses-container">
            {weaknesses.map((w) => {
              const bg = typeColors[w.type] || "#e5e7eb";
              const tooltip = `${name} takes ${w.multiplier}x damage from ${w.type}-type moves.`;
              return (
                <span
                  title={tooltip}
                  key={w.type}
                  className="weakness-badge"
                  style={{ backgroundColor: bg }}
                >
                  {w.type}
                  <span className="weakness-multiplier">{w.multiplier}x</span>
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
