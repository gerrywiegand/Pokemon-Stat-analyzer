import React from "react";
import StatBars from "./StatBars";

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  const { name, sprite, types, stats } = pokemon;

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Header: sprite + name + types */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {sprite && (
          <img
            src={sprite}
            alt={name}
            style={{
              width: "96px",
              height: "96px",
              imageRendering: "pixelated",
            }}
          />
        )}
        <div style={{ textAlign: "left" }}>
          <h2 style={{ margin: 0 }}>{name.toUpperCase()}</h2>
          <div style={{ marginTop: "8px" }}>
            {types.map((type) => (
              <span
                key={type}
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor: "#eee",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  marginRight: "6px",
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3 style={{ marginBottom: "10px" }}>Base Stats</h3>
        <StatBars stats={stats} />
      </div>
    </div>
  );
}

export default PokemonCard;
