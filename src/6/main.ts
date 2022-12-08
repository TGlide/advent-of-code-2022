import { unique } from "utils/array";
import { readInput } from "utils/io";

// Helpers
function detectStartOfPacketMarker(line: string): number {
  for (let i = 4; i < line.length; i++) {
    const chars = [...line.slice(i - 4, i)];

    if (unique(chars).length === chars.length) {
      return i;
    }
  }

  return -1;
}

function detectStartOfMessageMarker(line: string): number {
  for (let i = 14; i < line.length; i++) {
    const chars = [...line.slice(i - 14, i)];

    if (unique(chars).length === chars.length) {
      return i;
    }
  }

  return -1;
}

// Main
const input = readInput(6);
console.log("Part 1", detectStartOfPacketMarker(input));
console.log("Part 2", detectStartOfMessageMarker(input));
