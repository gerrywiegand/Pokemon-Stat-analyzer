import React from "react";

const MAX_STAT = 255; // Maximum possible base stat in Pokémon games

const STAT_COLORS = {
  hp: "#22c55e",
  attack: "#ef4444",
  defense: "#f59e0b",
  specialattack: "#3b82f6",
  specialdefense: "#6366f1",
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

        return (
          <div
            key={stat.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
              fontFamily: "monospace",
            }}
          >
            <span style={{ width: "110px" }}>{stat.name.toUpperCase()}</span>

            {/* Outer bar */}
            <div
              style={{
                flex: 1,
                height: "12px",
                borderRadius: "999px",
                backgroundColor: "#eee",
                overflow: "hidden",
              }}
            >
              {/* Inner bar */}
              <div
                style={{
                  height: "100%",
                  width: `${percent}%`,
                  backgroundColor: color,
                  transition: "width 0.2s ease-out",
                }}
              />
            </div>

            <span style={{ width: "40px", textAlign: "right" }}>
              {stat.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default StatBars;
