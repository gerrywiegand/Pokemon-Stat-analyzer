// src/components/TypeMatrix.jsx
import React from "react";
import typeChart from "../utils/typeChart";
import typeColors from "../utils/typeColors";

const ALL_TYPES = Object.keys(typeChart);

// Damage multiplier for a single defender type vs one attacking type
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
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        Type Matchup Chart
      </h2>

      <table
        style={{
          borderCollapse: "collapse",
          margin: "0 auto",
          minWidth: "640px",
          fontSize: "0.65rem",
          tableLayout: "fixed",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            {/* Empty corner cell */}
            <th
              style={{
                padding: "4px",
                position: "sticky",
                left: 0,
                background: "#f9fafb",
                zIndex: 3,
              }}
            ></th>

            {ALL_TYPES.map((type) => {
              const bg = typeColors[type] || "#e5e7eb";
              return (
                <th
                  key={type}
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
                    }}
                  >
                    {type}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {ALL_TYPES.map((defType) => {
            const defBg = typeColors[defType] || "#e5e7eb";

            return (
              <tr key={defType}>
                {/* Defender type label on left */}
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
                      backgroundColor: defBg,
                      color: "#fff",
                      textTransform: "uppercase",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {defType}
                  </span>
                </th>

                {ALL_TYPES.map((atkType) => {
                  const mult = getMultiplier(atkType, defType);

                  let bg = "#ffffff";
                  let color = "#111827";
                  let label = "";

                  if (mult === 2) {
                    bg = "#bbf7d0"; // green-ish
                    color = "#166534";
                    label = "2";
                  } else if (mult === 0.5) {
                    bg = "#fecaca"; // red-ish
                    color = "#7f1d1d";
                    label = "½";
                  } else if (mult === 0) {
                    bg = "#111827"; // near black
                    color = "#f9fafb";
                    label = "0";
                  } else {
                    // 1x, leave blank
                    label = "";
                  }

                  return (
                    <td
                      key={atkType}
                      style={{
                        width: "18px",
                        height: "18px",
                        textAlign: "center",
                        border: "1px solid #e5e7eb",
                        backgroundColor: bg,
                        color,
                        fontWeight: label ? 600 : 400,
                        padding: "0",
                        lineHeight: "18px",
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
