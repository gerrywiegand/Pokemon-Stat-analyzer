import React, { useState } from "react";
import typeColors from "../utils/typeColors";

const categoryColors = {
  physical: "#e3342f",
  special: "#3490dc",
  status: "#9561e2",
  unknown: "#6b7280",
};

function PokemonMoves({ physicalMoves, specialMoves, statusMoves }) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const handlePhysicalClick = () => {
    toggleCategory("physical");
  };

  const handleSpecialClick = () => {
    toggleCategory("special");
  };

  const handleStatusClick = () => {
    toggleCategory("status");
  };

  return (
    <>
      {/* Moves */}
      {physicalMoves && physicalMoves.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3
            onClick={() => toggleCategory("physical")}
            style={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              fontSize: "1.1rem",
              marginBottom: "8px",
              color: "#1d4ed8",
              textDecoration: "underline",
            }}
          >
            <span>{openCategory === "physical" ? "▼" : "▶"}</span>
            Physical Moves
          </h3>
          {openCategory === "physical" && (
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
          )}
        </div>
      )}
      {specialMoves && specialMoves.length > 0 && (
        <div
          style={{
            marginBottom: "8px",
          }}
        >
          <h3
            onClick={() => toggleCategory("special")}
            style={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              fontSize: "1.1rem",
              marginBottom: "8px",
              color: "#1d4ed8",
              textDecoration: "underline",
            }}
          >
            <span>{openCategory === "special" ? "▼" : "▶"}</span>
            Special Moves
          </h3>
          {openCategory === "special" && (
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
          )}
        </div>
      )}
      {statusMoves && statusMoves.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3
            onClick={() => toggleCategory("status")}
            style={{
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              fontSize: "1.1rem",
              marginBottom: "8px",
              color: "#1d4ed8",
              textDecoration: "underline",
            }}
          >
            <span>{openCategory === "status" ? "▼" : "▶"}</span>
            Status Moves
          </h3>
          {openCategory === "status" && (
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
          )}
        </div>
      )}
    </>
  );
}

export default PokemonMoves;
