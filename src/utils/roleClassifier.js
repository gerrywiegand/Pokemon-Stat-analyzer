function helper(stats, statname) {
  const stat = stats.find((s) => s.name === statname);
  if (stat) {
    return stat.value;
  } else {
    return 0;
  }
}

function classifyRole(stats) {
  if (!stats || !stats.length) {
    return "Unknown";
  }

  const hp = helper(stats, "hp");
  const attack = helper(stats, "attack");
  const defense = helper(stats, "defense");
  const specialAttack = helper(stats, "special-attack");
  const specialDefense = helper(stats, "special-defense");
  const speed = helper(stats, "speed");

  const offensive = Math.max(attack, specialAttack);
  const defensive = (hp + defense + specialDefense) / 3;
  const speedcategory = speed;

  const statArray = [
    { name: "offensive", value: offensive },
    { name: "defensive", value: defensive },
    { name: "speed", value: speedcategory },
  ];

  statArray.sort((a, b) => b.value - a.value);

  const primary = statArray[0].name;
  const secondary = statArray[1].name;

  let role = "Balanced"; // safe default

  // Helper to decide phys / special / mixed sweeper
  const attackDiff = attack - specialAttack;
  const sweeperRole =
    attackDiff >= 10
      ? "Physical Sweeper"
      : attackDiff <= -10
      ? "Special Sweeper"
      : "Mixed Sweeper";

  if (primary === "offensive") {
    if (secondary === "speed") {
      // Fast + strong → Sweeper
      role = sweeperRole;
    } else if (secondary === "defensive") {
      // Strong + bulky → Tank
      role = "Tank";
    } else {
      role = "Balanced";
    }
  } else if (primary === "defensive") {
    const highOffense = offensive >= 100;

    if (highOffense) {
      role = "Tank";
    } else {
      // Decide wall type
      if (defense >= specialDefense + 10) {
        role = "Physical Wall";
      } else if (specialDefense >= defense + 10) {
        role = "Special Wall";
      } else {
        role = "Mixed Wall";
      }
    }
  } else if (primary === "speed") {
    if (secondary === "offensive") {
      role = sweeperRole;
    } else {
      role = "Balanced";
    }
  }

  return role;
}

export { classifyRole };
