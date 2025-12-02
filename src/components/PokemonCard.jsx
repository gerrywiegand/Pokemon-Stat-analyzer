import React from "react";
import StatBars from "./StatBars";
import typeColors from "../utils/typeColors";
import { getWeaknessesForTypes } from "../utils/typeMatchups";
import { classifyRole } from "../utils/roleClassifier";

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  const { id, name, sprite, artwork, types, abilities, stats } = pokemon;
  const weaknesses = getWeaknessesForTypes(types);

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "20px 20px 24px",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        maxWidth: "640px",
        marginLeft: "auto",
        marginRight: "auto",
        background: "linear-gradient(135deg, #f9fafb, #eef2ff)",
      }}
    >
      {/* Header: sprite + name + types */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
          <h2 style={{ margin: 0 }}>
            {name.toUpperCase()}{" "}
            {typeof id === "number" && (
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "normal",
                  color: "#666",
                }}
              >
                #{id.toString().padStart(3, "0")}
              </span>
            )}
            <div
              style={{ fontSize: "0.9rem", color: "#444", marginTop: "4px" }}
            >
              Role: {classifyRole(stats)}
            </div>
          </h2>
          <div style={{ marginTop: "8px" }}>
            {types.map((type) => {
              const bg = typeColors[type] || "#eee";

              return (
                <span
                  key={type}
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    backgroundColor: bg,
                    color: "#fff",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    marginRight: "6px",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                  }}
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
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <img
            src={artwork}
            alt={`${name} artwork`}
            style={{ maxWidth: "260px", width: "100%" }}
          />
        </div>
      )}

      {abilities && abilities.length > 0 && (
        <div style={{ marginTop: "16px", textAlign: "left" }}>
          <h3 style={{ marginBottom: "6px" }}>Abilities</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {abilities.map((ability) => (
              <li key={ability.name} style={{ marginBottom: "8px" }}>
                <div>
                  <strong>
                    {ability.name.replace("-", " ")}
                    {ability.isHidden && (
                      <span style={{ fontSize: "0.8rem", color: "#888" }}>
                        {" "}
                        (Hidden)
                      </span>
                    )}
                  </strong>
                </div>
                {ability.description && (
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#555",
                      marginTop: "2px",
                    }}
                  >
                    {ability.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

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
              return (
                <span
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
    </div>
  );
}

export default PokemonCard;
