/**
 * Decide which stack a package should go to based on
 * its dimensions (cm) and mass (kg).
 *
 * Stacks:
 * - "STANDARD": neither bulky nor heavy
 * - "SPECIAL":  bulky XOR heavy
 * - "REJECTED": bulky AND heavy
 *
 * A package is:
 * - bulky if volume >= 1,000,000 cm³ OR any dimension >= 150 cm
 * - heavy if mass >= 20 kg
 *
 * @param {number} width  - in centimeters
 * @param {number} height - in centimeters
 * @param {number} length - in centimeters
 * @param {number} mass   - in kilograms
 * @returns {"STANDARD" | "SPECIAL" | "REJECTED"}
 */
function sort(width, height, length, mass) {
  const volume = width * height * length;

  const isBulky =
    volume >= 1_000_000 ||
    width >= 150 ||
    height >= 150 ||
    length >= 150;

  const isHeavy = mass >= 20;

  if (isBulky && isHeavy) {
    return "REJECTED";
  }

  if (isBulky || isHeavy) {
    return "SPECIAL";
  }

  return "STANDARD";
}

// Simple test runner if this file is executed directly with Node.
if (require.main === module) {
  const tests = [
    { args: [100, 100, 99, 10], expected: "STANDARD" }, // not bulky, not heavy
    { args: [100, 100, 100, 10], expected: "SPECIAL" }, // volume exactly 1,000,000 -> bulky
    { args: [200, 50, 50, 10], expected: "SPECIAL" }, // dimension >= 150 -> bulky
    { args: [100, 100, 100, 25], expected: "SPECIAL" }, // heavy only
    { args: [200, 200, 200, 25], expected: "REJECTED" }, // bulky and heavy
    { args: [150, 1, 1, 19.99], expected: "SPECIAL" }, // dimension exactly 150
    { args: [1, 1, 1_000_000, 20], expected: "REJECTED" }, // extremely bulky and heavy
  ];

  let passed = 0;
  for (const { args, expected } of tests) {
    const result = sort(...args);
    const label = `sort(${args.join(", ")})`;
    if (result === expected) {
      console.log(`✅ ${label} => ${result}`);
      passed++;
    } else {
      console.error(`❌ ${label} => ${result} (expected ${expected})`);
    }
  }

  console.log(`\n${passed}/${tests.length} tests passed`);
}

module.exports = { sort };

