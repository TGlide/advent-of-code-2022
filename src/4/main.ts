import { readInput } from "utils/io";

const input = readInput(4);
const pairs = input
  .split("\n")
  .map((line) => line.split(",").map((pair) => pair.split("-").map(Number)));

// Part 1
let fullyContained = 0;
for (const [p1, p2] of pairs) {
  if (p1[0] <= p2[0] && p1[1] >= p2[1]) {
    fullyContained++;
  } else if (p2[0] <= p1[0] && p2[1] >= p1[1]) {
    fullyContained++;
  }
}

console.log(`Part 1: ${fullyContained}`);

// Part 2
let overlapping = 0;
for (const [p1, p2] of pairs) {
  if (p1[0] <= p2[0] && p1[1] >= p2[0]) {
    overlapping++;
  } else if (p2[0] <= p1[0] && p2[1] >= p1[0]) {
    overlapping++;
  }
}

console.log(`Part 2: ${overlapping}`);
