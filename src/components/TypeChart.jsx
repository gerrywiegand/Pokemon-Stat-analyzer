// src/components/TypeChart.jsx
import React from "react";
import typeChart from "../utils/typeChart";
import typeColors from "../utils/typeColors";

function TypeChart() {
  const types = Object.keys(typeChart);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        Type Matchup Overview
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
        }}
      >
        {types.map((type) => {
          const info = typeChart[type];
          const bg = typeColors[type] || "#e5e7eb";

          return (
            <div
              key={type}
              style={{
                minWidth: "180px",
                maxWidth: "220px",
                padding: "10px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                fontSize: "0.8rem",
              }}
            >
              <div style={{ marginBottom: "6px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    backgroundColor: bg,
                    color: "#fff",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  {type}
                </span>
              </div>
              <div>
                <strong>Weak to:</strong>{" "}
                {info.weakTo.length ? info.weakTo.join(", ") : "—"}
              </div>
              <div style={{ marginTop: "2px" }}>
                <strong>Resists:</strong>{" "}
                {info.resistantTo.length ? info.resistantTo.join(", ") : "—"}
              </div>
              {info.immuneTo.length > 0 && (
                <div style={{ marginTop: "2px" }}>
                  <strong>Immune to:</strong> {info.immuneTo.join(", ")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TypeChart;
