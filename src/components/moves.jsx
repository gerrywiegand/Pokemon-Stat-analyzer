import React from "react";
import typeColors from "../utils/typeColors";

const categoryColors = {
  physical: "#e3342f",
  special: "#3490dc",
  status: "#9561e2",
  unknown: "#6b7280",
};

function PokemonMoves({ physicalMoves, specialMoves, statusMoves }) {
  return (
    <>
      {/* Moves */}
      {physicalMoves && physicalMoves.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3 style={{ marginBottom: "8px" }}>Physical Moves</h3>
          <div>
            {physicalMoves.map((move) => {
              const typeBg = typeColors[move.type] || "#e5e7eb";
              const catBg = categoryColors[move.category] || "#aaa";
              return (
                <div
                  key={move.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    fontSize: "0.9rem",
                  }}
                >
                  <strong
                    style={{ textTransform: "capitalize", minWidth: "140px" }}
                  >
                    {move.name.replace("-", " ")}
                  </strong>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "999px",
                      backgroundColor: typeBg,
                      color: "white",
                      fontSize: "0.75rem",
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
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {move.category}
                  </span>
                  {move.power != null && (
                    <span style={{ marginLeft: "auto" }}>
                      Power {move.power}
                    </span>
                  )}
                  {move.accuracy != null && <span>Acc {move.accuracy}%</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {specialMoves && specialMoves.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3 style={{ marginBottom: "8px" }}>Special Moves</h3>
          <div>
            {specialMoves.map((move) => {
              const typeBg = typeColors[move.type] || "#e5e7eb";
              const catBg = categoryColors[move.category] || "#aaa";
              return (
                <div
                  key={move.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    fontSize: "0.9rem",
                  }}
                >
                  <strong
                    style={{ textTransform: "capitalize", minWidth: "140px" }}
                  >
                    {move.name.replace("-", " ")}
                  </strong>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "999px",
                      backgroundColor: typeBg,
                      color: "white",
                      fontSize: "0.75rem",
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
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {move.category}
                  </span>
                  {move.power != null && (
                    <span style={{ marginLeft: "auto" }}>
                      Power {move.power}
                    </span>
                  )}
                  {move.accuracy != null && <span>Acc {move.accuracy}%</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {statusMoves && statusMoves.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3 style={{ marginBottom: "8px" }}>Status Moves</h3>
          <div>
            {statusMoves.map((move) => {
              const typeBg = typeColors[move.type] || "#e5e7eb";
              const catBg = categoryColors[move.category] || "#aaa";
              return (
                <div
                  key={move.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    fontSize: "0.9rem",
                  }}
                >
                  {/* Move Name */}
                  <strong
                    style={{ textTransform: "capitalize", minWidth: "140px" }}
                  >
                    {move.name.replace("-", " ")}
                  </strong>

                  {/* TYPE PILL */}
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "999px",
                      backgroundColor: typeBg,
                      color: "white",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {move.type}
                  </span>

                  {/* CATEGORY PILL */}
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "999px",
                      backgroundColor: catBg,
                      color: "white",
                      fontSize: "0.75rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {move.category}
                  </span>

                  {/* POWER & ACCURACY */}
                  {move.power != null && (
                    <span style={{ marginLeft: "auto" }}>
                      Power {move.power}
                    </span>
                  )}
                  {move.accuracy != null && <span>Acc {move.accuracy}%</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonMoves;
