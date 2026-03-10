# Package Sorter — Robotic Arm Dispatch

Solution for Smarter Technology’s robotic automation factory: a function that dispatches packages to the correct stack based on volume and mass.

## Rules

- **Bulky**: volume (Width × Height × Length) ≥ 1,000,000 cm³ **or** any dimension ≥ 150 cm  
- **Heavy**: mass ≥ 20 kg  

| Stack      | Condition                          |
|-----------|-------------------------------------|
| STANDARD  | Not bulky and not heavy             |
| SPECIAL   | Bulky or heavy (but not both)       |
| REJECTED  | Both bulky and heavy                |

## Implementation

- **Function**: `sort(width, height, length, mass)`  
- **Units**: centimeters (dimensions), kilograms (mass)  
- **Returns**: `"STANDARD"` \| `"SPECIAL"` \| `"REJECTED"`

## Requirements

- **Node.js** (any recent LTS, e.g. 18+)

## Run

From the project folder:

```bash
node packageSorter.js
```

This runs the built-in tests and prints results.

## Use in code

```javascript
const { sort } = require("./packageSorter");

sort(100, 100, 99, 10);   // "STANDARD"
sort(200, 50, 50, 10);    // "SPECIAL" (bulky)
sort(100, 100, 100, 25);  // "SPECIAL" (heavy)
sort(200, 200, 200, 25);  // "REJECTED"
```

## Test cases

The file includes tests for:

- Standard package (under all thresholds)
- Bulky by volume (exactly 1,000,000 cm³)
- Bulky by dimension (≥ 150 cm)
- Heavy only
- Both bulky and heavy (rejected)
- Boundary values (e.g. 150 cm, 19.99 kg)
