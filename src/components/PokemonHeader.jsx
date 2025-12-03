import React from "react";
import typeColors from "../utils/typeColors";
import { classifyRole } from "../utils/roleClassifier";
import "../styles/PokemonHeader.css";

function PokemonHeader({ id, name, sprite, artwork, types, stats, abilities }) {
  return (
    <>
      {/* Header: sprite + name + types */}
      <div className="pokemon-header-container">
        {sprite && <img src={sprite} alt={name} className="pokemon-sprite" />}
        <div>
          <h2 className="pokemon-name">
            {name.toUpperCase()}{" "}
            {typeof id === "number" && (
              <span className="pokemon-dex-number">
                #{id.toString().padStart(3, "0")}
              </span>
            )}
          </h2>

          <div className="pokemon-role">Role: {classifyRole(stats)}</div>
          <div className="pokemon-types-container">
            {types.map((type) => {
              const bg = typeColors[type] || "#eee";

              return (
                <span
                  key={type}
                  className="pokemon-type-badge"
                  style={{ backgroundColor: bg }}
                >
                  {type}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional big artwork */}
      {artwork && (
        <div className="pokemon-artwork-container">
          <img
            src={artwork}
            alt={`${name} artwork`}
            className="pokemon-artwork"
          />
        </div>
      )}
      {abilities && abilities.length > 0 && (
        <div className="pokemon-abilities-container">
          <h3 className="pokemon-abilities-title">Abilities</h3>
          <ul className="pokemon-abilities-list">
            {abilities.map((ability) => (
              <li key={ability.name} className="pokemon-ability-item">
                <div>
                  <strong>
                    {ability.name.replace("-", " ")}
                    {ability.isHidden && (
                      <span className="pokemon-ability-hidden"> (Hidden)</span>
                    )}
                  </strong>
                </div>
                {ability.description && (
                  <div className="pokemon-ability-description">
                    {ability.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default PokemonHeader;
