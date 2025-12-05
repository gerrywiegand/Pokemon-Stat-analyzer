import React from "react";
import typeChart from "../utils/typeChart";
import typeColors from "../utils/typeColors";
import "../styles/TypeMatrix.css";

const allTypes = Object.keys(typeChart);

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
    <>
      <div className="type-matrix-wrapper">
        <h2 className="type-matrix-title">Type Matchup Chart</h2>
        <p className="type-matrix-subtitle">
          Rows = <strong>Attacker</strong> • Columns = <strong>Defender</strong>
        </p>
      </div>

      <div className="type-matrix-table-wrapper">
        <table className="type-matrix-table">
          <thead>
            <tr>
              <th className="type-matrix-corner-cell">Atk ⟂ Def</th>

              {allTypes.map((defType) => {
                const bg = typeColors[defType] || "#e5e7eb";
                return (
                  <th key={defType} className="type-matrix-header-cell">
                    <span
                      className="type-matrix-type-badge"
                      style={{ backgroundColor: bg }}
                    >
                      {defType}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {allTypes.map((atkType) => {
              const atkBg = typeColors[atkType] || "#e5e7eb";

              return (
                <tr key={atkType}>
                  <th className="type-matrix-row-header">
                    <span
                      className="type-matrix-type-badge"
                      style={{ backgroundColor: atkBg }}
                    >
                      {atkType}
                    </span>
                  </th>

                  {allTypes.map((defType) => {
                    const mult = getMultiplier(atkType, defType);

                    let cellClass = "type-matrix-cell ";
                    let label = "";

                    if (mult === 2) {
                      cellClass += "type-matrix-cell-super-effective";
                      label = "2";
                    } else if (mult === 0.5) {
                      cellClass += "type-matrix-cell-not-effective";
                      label = "½";
                    } else if (mult === 0) {
                      cellClass += "type-matrix-cell-immune";
                      label = "0";
                    } else {
                      cellClass += "type-matrix-cell-normal";
                    }

                    return (
                      <td key={defType} className={cellClass}>
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
    </>
  );
}

export default TypeMatrix;
