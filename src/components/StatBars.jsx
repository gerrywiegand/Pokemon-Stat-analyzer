import React from "react";
import "../styles/StatBars.css";

const STAT_NAMES = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Spe",
};

const MAX_STAT = 180; // Maximum possible base stat is 255, but I use 180 for better visualization

const STAT_COLORS = {
  hp: "#22c55e",
  attack: "#ef4444",
  defense: "#f59e0b",
  "special-attack": "#3b82f6",
  "special-defense": "#6366f1",
  speed: "#f1e90dff",
  default: "#76a5af",
};

function StatBars({ stats }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div>
      {stats.map((stat) => {
        const percent = Math.min((stat.value / MAX_STAT) * 100, 100);
        const color = STAT_COLORS[stat.name] || STAT_COLORS.default;
        const label = STAT_NAMES[stat.name] || stat.name.toUpperCase();

        return (
          <div key={stat.name} className="stat-bar-container">
            <span className="stat-label">{label}</span>

            {/* Outer bar */}
            <div className="stat-bar-outer">
              {/* Inner bar */}
              <div
                className="stat-bar-inner"
                style={{
                  width: `${percent}%`,
                  backgroundColor: color,
                }}
              />
            </div>

            <span className="stat-value">{stat.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default StatBars;
