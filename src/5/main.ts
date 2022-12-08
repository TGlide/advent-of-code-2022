import { invertMatrix, normalizeMatrix } from "utils/array";
import { readInput } from "utils/io";

// Commands
type Command = {
  num: number;
  from: number;
  to: number;
};

function parseCommand(line: string): Command {
  const match = line.match(/move (\d+) from (\d+) to (\d+)/);
  if (!match) {
    throw new Error(`Invalid command: ${line}`);
  }
  const [_, num, from, to] = match;

  return {
    num: parseInt(num),
    from: parseInt(from),
    to: parseInt(to),
  };
}

function logCommand(command: Command): void {
  console.log(`move ${command.num} from ${command.from} to ${command.to}`);
}

// Crates
type CrateLine = Array<string | null>;

function parseCrateRow(line: string): CrateLine {
  const res: CrateLine = [];
  let readingCrate = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === "[") {
      readingCrate = true;
    } else if (char === "]") {
      readingCrate = false;
    }

    if (readingCrate && char !== "[") {
      const crateIdx = Math.floor((i - 1) / 4);
      res[crateIdx] = char;
    }
  }

  return res;
}

function logCrateLine(crateLine: CrateLine): void {
  let rowStr = "";

  for (const crate of crateLine) {
    if (crate) {
      rowStr += `[${crate}]`;
    } else {
      rowStr += `   `;
    }
  }

  console.log(rowStr);
}

function logCrateLines(crateLines: Array<CrateLine>): void {
  for (const crateRow of crateLines) {
    logCrateLine(crateRow);
  }
}

function removeCrate(crateCol: CrateLine) {
  let removedCrate: string | null = null;

  for (let i = 0; i < crateCol.length; i++) {
    if (crateCol[i]) {
      removedCrate = crateCol[i];
      crateCol[i] = null;
      break;
    }
  }

  return removedCrate;
}

function removeNCrates(crateCol: CrateLine, n: number) {
  let removedCrates: Array<string> = [];

  for (let i = 0; i < crateCol.length; i++) {
    if (typeof crateCol[i] === "string") {
      removedCrates.push(crateCol[i] as string);
      crateCol[i] = null;
      if (removedCrates.length === n) break;
    }
  }

  return removedCrates;
}

function insertCrate(crateCol: CrateLine, crate: string) {
  let lastEmptyIdx = -1;

  for (let i = 0; i < crateCol.length; i++) {
    if (!crateCol[i]) {
      lastEmptyIdx = i;
    }
  }

  if (lastEmptyIdx === -1) {
    crateCol.unshift(crate);
  } else {
    crateCol[lastEmptyIdx] = crate;
  }
}

function insertCrates(crateCol: CrateLine, crates: Array<string>) {
  let lastEmptyIdx = -1;

  for (let i = 0; i < crateCol.length; i++) {
    if (!crateCol[i]) {
      lastEmptyIdx = i;
    }
  }

  if (lastEmptyIdx === -1) {
    crateCol.unshift(...crates);
  } else {
    crateCol.splice(lastEmptyIdx, 0, ...crates);
  }
}

function getTopCrate(crateCol: CrateLine): CrateLine[number] {
  return crateCol.find((crate) => !!crate) || null;
}

function getTopCrates(crateCols: Array<CrateLine>): Array<CrateLine[number]> {
  return crateCols.map(getTopCrate);
}

// Main
const input = readInput(5);

const lines = input.split("\n");

let crateRows: Array<CrateLine> = [];
let commands: Array<Command> = [];

for (const line of lines) {
  if (line.startsWith("move")) {
    commands.push(parseCommand(line));
  } else {
    const crateRow = parseCrateRow(line);
    crateRow.length && crateRows.push(crateRow);
  }
}

console.log("Initial state:");
logCrateLines(crateRows);

// Part 1
console.log("\nPart 1:");
let crateCols = invertMatrix(crateRows);

for (const command of commands) {
  const { num, from, to } = command;

  for (let i = 0; i < num; i++) {
    const crate = removeCrate(crateCols[from - 1]);
    if (!crate) continue;
    insertCrate(crateCols[to - 1], crate);
  }

  crateCols = normalizeMatrix(crateCols);
}

logCrateLines(invertMatrix(crateCols));
console.log("\nTop Crates:");
console.log(getTopCrates(crateCols).join(""));

// Part 2
console.log("\nPart 2:");
crateCols = invertMatrix(crateRows);

for (const command of commands) {
  const { num, from, to } = command;

  const crates = removeNCrates(crateCols[from - 1], num);
  insertCrates(crateCols[to - 1], crates);

  crateCols = normalizeMatrix(crateCols);
}

logCrateLines(invertMatrix(crateCols));
console.log("\nTop Crates:");
console.log(getTopCrates(crateCols).join(""));
