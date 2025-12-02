// src/components/TypeMatrix.jsx
import React from "react";
import typeChart from "../utils/typeChart";
import typeColors from "../utils/typeColors";

const ALL_TYPES = Object.keys(typeChart);

function getMultiplier(attackType, defendType) {
  const info = typeChart[defendType];
  if (!info) return 1;

  if (info.immuneTo.includes(attackType)) return 0;
  if (info.weakTo.includes(attackType)) return 2;
  if (info.resistantTo.includes(attackType)) return 0.5;
  return 1;
}

function TypeMatrix() {
  return (
    <div style={{ marginTop: "20px", overflowX: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "4px" }}>
        Type Matchup Chart
      </h2>
      <p
        style={{
          textAlign: "center",
          marginBottom: "12px",
          fontSize: "0.85rem",
          color: "#6b7280",
        }}
      >
        Rows = <strong>Attacker</strong> • Columns = <strong>Defender</strong>
      </p>

      <table
        style={{
          borderCollapse: "collapse",
          margin: "0 auto",
          minWidth: "640px",
          fontSize: "0.65rem",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "4px",
                position: "sticky",
                left: 0,
                top: 0,
                background: "#f9fafb",
                zIndex: 3,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.7rem",
                whiteSpace: "nowrap",
              }}
            >
              Atk ⟂ Def
            </th>

            {ALL_TYPES.map((defType) => {
              const bg = typeColors[defType] || "#e5e7eb";
              return (
                <th
                  key={defType}
                  style={{
                    padding: "2px 6px",
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    background: "#f9fafb",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 6px",
                      borderRadius: "999px",
                      backgroundColor: bg,
                      color: "#fff",
                      textTransform: "uppercase",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {defType}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {ALL_TYPES.map((atkType) => {
            const atkBg = typeColors[atkType] || "#e5e7eb";

            return (
              <tr key={atkType}>
                <th
                  style={{
                    padding: "2px 6px",
                    textAlign: "right",
                    position: "sticky",
                    left: 0,
                    background: "#f9fafb",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 6px",
                      borderRadius: "999px",
                      backgroundColor: atkBg,
                      color: "#fff",
                      textTransform: "uppercase",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {atkType}
                  </span>
                </th>

                {ALL_TYPES.map((defType) => {
                  const mult = getMultiplier(atkType, defType);

                  let bg = "#ffffff";
                  let color = "#111827";
                  let label = "";

                  if (mult === 2) {
                    bg = "#bbf7d0";
                    color = "#166534";
                    label = "2";
                  } else if (mult === 0.5) {
                    bg = "#fecaca";
                    color = "#7f1d1d";
                    label = "½";
                  } else if (mult === 0) {
                    bg = "#111827";
                    color = "#f9fafb";
                    label = "0";
                  }

                  return (
                    <td
                      key={defType}
                      style={{
                        width: "12px",
                        height: "12px",
                        textAlign: "center",
                        border: "1px solid #e5e7eb",
                        backgroundColor: bg,
                        color,
                        fontWeight: label ? 600 : 400,
                        padding: 0,
                        lineHeight: "12px", // match height
                        fontSize: "0.55rem", // small but readable
                      }}
                    >
                      {label}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TypeMatrix;
