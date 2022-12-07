import { sum, unique } from "utils/array";
import { readInput } from "utils/io";

function getPriority(char: string): number {
  const code = char.charCodeAt(0);
  if (code >= 97) return code - 96;
  else return code - 38;
}

function getCommonItems<T>(...arrays: T[][]): T[] {
  const firstArray = arrays[0];
  const otherArrays = arrays.slice(1);

  return unique(
    firstArray.filter((item) => {
      return otherArrays.every((arr) => arr.includes(item));
    })
  );
}

function splitArrayInNParts<T>(array: T[], n: number): T[][] {
  const partSize = Math.ceil(array.length / n);

  const parts = [];
  for (let i = 0; i < n; i++) {
    parts.push(array.slice(i * partSize, (i + 1) * partSize));
  }

  return parts;
}

function splitArrayInChunks<T>(array: T[], chunkSize: number): T[][] {
  const parts = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    parts.push(array.slice(i, i + chunkSize));
  }

  return parts;
}

const input = readInput(3);
const rucksacks = input.split("\n");

// Part 1
const splitRucksacks = rucksacks.map((line) =>
  splitArrayInNParts(line.split(""), 2)
);

let commonItems = splitRucksacks.reduce<string[]>((acc, curr) => {
  return [...acc, ...getCommonItems(...curr)];
}, []);

let priorities = commonItems.map(getPriority);

console.log(`Part 1: ${sum(priorities)}`);

// Part 2
const groupedRucksacks = splitArrayInChunks(rucksacks, 3).map((chunk) =>
  chunk.map((line) => line.split(""))
);

commonItems = groupedRucksacks.reduce<string[]>((acc, curr) => {
  return [...acc, ...getCommonItems(...curr)];
}, []);

priorities = commonItems.map(getPriority);
console.log(`Part 2: ${sum(priorities)}`);
