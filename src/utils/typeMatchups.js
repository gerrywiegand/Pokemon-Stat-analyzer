import typeChart from "../utils/typeChart";

const allTypes = Object.keys(typeChart);

export function getWeaknessesForTypes(defenderTypes) {
  const defenders = defenderTypes.length ? defenderTypes : ["normal"];
  const results = [];

  for (const attackType of allTypes) {
    let multiplier = 1;

    for (const def of defenders) {
      const info = typeChart[def];
      if (!info) continue;

      if (info.immuneTo.includes(attackType)) {
        multiplier *= 0;
      } else if (info.weakTo.includes(attackType)) {
        multiplier *= 2;
      } else if (info.resistantTo.includes(attackType)) {
        multiplier *= 0.5;
      }
    }

    if (multiplier > 1) {
      results.push({ type: attackType, multiplier });
    }
  }

  // Sort so 4x weaknesses appear first
  results.sort((a, b) => b.multiplier - a.multiplier);
  return results;
}
