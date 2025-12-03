import React from "react";
import typeColors from "../utils/typeColors";
import { classifyRole } from "../utils/roleClassifier";

function PokemonHeader({ id, name, sprite, artwork, types, stats, abilities }) {
  return (
    <>
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
        <div>
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
          </h2>

          <div style={{ fontSize: "0.9rem", color: "#444", marginTop: "4px" }}>
            Role: {classifyRole(stats)}
          </div>
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
    </>
  );
}

export default PokemonHeader;
