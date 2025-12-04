import React, { useState } from "react";
import typeColors from "../utils/typeColors";
import "../styles/PokemonMoves.css";

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

  const renderMoves = (moves) =>
    moves.map((move) => {
      const typeBg = typeColors[move.type] || "#e5e7eb";
      const catBg = categoryColors[move.category] || "#aaa";
      const tooltip = move.description || "";

      return (
        <div key={move.name} className="move-item" title={tooltip}>
          <strong className="move-name">{move.name.replace("-", " ")}</strong>
          <span className="move-type-badge" style={{ backgroundColor: typeBg }}>
            {move.type}
          </span>
          <span
            className="move-category-badge"
            style={{ backgroundColor: catBg }}
          >
            {move.category}
          </span>
          {move.power != null && (
            <span className="move-power">Power {move.power}</span>
          )}
          {move.accuracy != null && <span>Acc {move.accuracy}%</span>}
        </div>
      );
    });

  return (
    <>
      {/* Moves */}
      {physicalMoves && physicalMoves.length > 0 && (
        <div className="moves-section">
          <p className="moves-tip ">
            *Hover over a move name for a description*
          </p>
          <h3
            onClick={() => toggleCategory("physical")}
            className="moves-category-header"
          >
            <span>{openCategory === "physical" ? "▼" : "▶"}</span>
            Physical Moves
          </h3>
          {openCategory === "physical" && (
            <div>{renderMoves(physicalMoves)}</div>
          )}
        </div>
      )}
      {specialMoves && specialMoves.length > 0 && (
        <div className="moves-category-content">
          <h3
            onClick={() => toggleCategory("special")}
            className="moves-category-header"
          >
            <span>{openCategory === "special" ? "▼" : "▶"}</span>
            Special Moves
          </h3>
          {openCategory === "special" && <div>{renderMoves(specialMoves)}</div>}
        </div>
      )}
      {statusMoves && statusMoves.length > 0 && (
        <div className="moves-section">
          <h3
            onClick={() => toggleCategory("status")}
            className="moves-category-header"
          >
            <span>{openCategory === "status" ? "▼" : "▶"}</span>
            Status Moves
          </h3>
          {openCategory === "status" && (
            <div>
              {renderMoves(statusMoves)}
              return (
              <div key={move.name} className="move-item">
                {/* Move Name */}
                <strong className="move-name">
                  {move.name.replace("-", " ")}
                </strong>

                {/* TYPE PILL */}
                <span
                  className="move-type-badge"
                  style={{ backgroundColor: typeBg }}
                >
                  {move.type}
                </span>

                {/* CATEGORY PILL */}
                <span
                  className="move-category-badge"
                  style={{ backgroundColor: catBg }}
                >
                  {move.category}
                </span>

                {/* POWER & ACCURACY */}
                {move.power != null && (
                  <span className="move-power">Power {move.power}</span>
                )}
                {move.accuracy != null && <span>Acc {move.accuracy}%</span>}
              </div>
              ); })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PokemonMoves;
