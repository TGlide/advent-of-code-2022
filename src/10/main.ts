import { range, splitInChunks } from "utils/array";
import { readInput } from "utils/io";

const input = readInput(10);
const commands: Array<[string, number]> = input.split("\n").map((line) => {
  const [c, v] = line.split(" ");
  return [c, parseInt(v)];
});

// Part 1
const commandDuration: Record<string, number> = {
  noop: 1,
  addx: 2,
};

const importantCycles = range(20, 221, 40);
let cycle = 0;
let X = 1;
let res = 0;

for (const command of commands) {
  const [name, value] = command;
  const duration = commandDuration[name];

  for (let i = 0; i < duration; i++) {
    cycle++;

    if (importantCycles.includes(cycle)) {
      res += cycle * X;
    }
  }

  if (name === "addx") {
    X += value;
  }
}

console.log(`Part 1: ${res}`);

// Part 2
cycle = 0;
X = 1;
const pixels: string[] = [];

for (const command of commands) {
  const [name, value] = command;
  const duration = commandDuration[name];

  for (let i = 0; i < duration; i++) {
    if ([X - 1, X, X + 1].includes(cycle % 40)) {
      pixels.push("#");
    } else {
      pixels.push(" ");
    }

    cycle++;
  }

  if (name === "addx") {
    X += value;
  }
}

const pixelGrid = splitInChunks(pixels, 40);
for (const row of pixelGrid) {
  console.log(row.join(""));
}
