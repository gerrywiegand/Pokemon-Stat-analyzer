import React from "react";
import StatBars from "./StatBars";
import typeColors from "../utils/typeColors";
import { getWeaknessesForTypes } from "../utils/typeMatchups";
import { classifyRole } from "../utils/roleClassifier";

const categoryColors = {
  physical: "#e3342f",
  special: "#3490dc",
  status: "#9561e2",
  unknown: "#6b7280",
};

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;
  const { id, name, sprite, artwork, types, abilities, stats, moves } = pokemon;
  const {
    physicalMoves = [],
    specialMoves = [],
    statusMoves = [],
  } = moves || {};

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
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* MOVES SECTION */}
        {(physicalMoves.length || specialMoves.length || statusMoves.length) >
          0 && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3 style={{ marginBottom: "8px" }}>Moves</h3>

            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              {/* Physical Moves */}
              {physicalMoves.length > 0 && (
                <div
                  style={{
                    flex: 1,
                    minWidth: "260px",
                    maxHeight: "260px",
                    overflowY: "auto",
                  }}
                >
                  <h4 style={{ marginBottom: "8px" }}>Physical Moves</h4>
                  {physicalMoves.map((move) => {
                    const typeBg = typeColors[move.type] || "#e5e7eb";
                    const catBg = categoryColors[move.category] || "#aaa";
                    return (
                      <div
                        key={move.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "4px",
                          fontSize: "0.85rem",
                        }}
                      >
                        <strong
                          style={{
                            textTransform: "capitalize",
                            minWidth: "120px",
                          }}
                        >
                          {move.name.replace("-", " ")}
                        </strong>

                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: typeBg,
                            color: "white",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {move.type}
                        </span>

                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: catBg,
                            color: "white",
                            fontSize: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {move.category}
                        </span>

                        {move.power != null && (
                          <span style={{ marginLeft: "auto" }}>
                            Pwr {move.power}
                          </span>
                        )}
                        {move.accuracy != null && (
                          <span>Acc {move.accuracy}%</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Special Moves */}
              {specialMoves.length > 0 && (
                <div
                  style={{
                    flex: 1,
                    minWidth: "260px",
                    maxHeight: "260px",
                    overflowY: "auto",
                  }}
                >
                  <h4 style={{ marginBottom: "8px" }}>Special Moves</h4>
                  {specialMoves.map((move) => {
                    const typeBg = typeColors[move.type] || "#e5e7eb";
                    const catBg = categoryColors[move.category] || "#aaa";
                    return (
                      <div
                        key={move.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "4px",
                          fontSize: "0.85rem",
                        }}
                      >
                        <strong
                          style={{
                            textTransform: "capitalize",
                            minWidth: "120px",
                          }}
                        >
                          {move.name.replace("-", " ")}
                        </strong>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: typeBg,
                            color: "white",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {move.type}
                        </span>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: catBg,
                            color: "white",
                            fontSize: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {move.category}
                        </span>
                        {move.power != null && (
                          <span style={{ marginLeft: "auto" }}>
                            Pwr {move.power}
                          </span>
                        )}
                        {move.accuracy != null && (
                          <span>Acc {move.accuracy}%</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Status Moves */}
              {statusMoves.length > 0 && (
                <div
                  style={{
                    flex: 1,
                    minWidth: "260px",
                    maxHeight: "260px",
                    overflowY: "auto",
                  }}
                >
                  <h4 style={{ marginBottom: "8px" }}>Status Moves</h4>
                  {statusMoves.map((move) => {
                    const typeBg = typeColors[move.type] || "#e5e7eb";
                    const catBg = categoryColors[move.category] || "#aaa";
                    return (
                      <div
                        key={move.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "4px",
                          fontSize: "0.85rem",
                        }}
                      >
                        <strong
                          style={{
                            textTransform: "capitalize",
                            minWidth: "120px",
                          }}
                        >
                          {move.name.replace("-", " ")}
                        </strong>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: typeBg,
                            color: "white",
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {move.type}
                        </span>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "999px",
                            backgroundColor: catBg,
                            color: "white",
                            fontSize: "0.7rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {move.category}
                        </span>
                        {/* status moves usually have no power; accuracy is often null, so we can skip */}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
