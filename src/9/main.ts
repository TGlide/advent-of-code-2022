import { at } from "utils/array";
import { readInput } from "utils/io";

// Helpers
type Position = [number, number];

function getPosKey(pos: Position): string {
  return `${pos[0]}-${pos[1]}`;
}

function moveDir(pos: Position, dir: string): Position {
  switch (dir) {
    case "U":
      return [pos[0], pos[1] + 1];
    case "D":
      return [pos[0], pos[1] - 1];
    case "L":
      return [pos[0] - 1, pos[1]];
    case "R":
      return [pos[0] + 1, pos[1]];
    default:
      return pos;
  }
}

/**
 * Receives two positions, and returns a modified version of the first position
 * that is one step closer to the second position.
 */
function followPos(posA: Position, posB: Position): Position {
  const [x1, y1] = posA;
  const [x2, y2] = posB;

  const touching = Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
  if (touching) return posA;

  let newPos: Position = [x1, y1];

  if (x1 < x2) newPos[0]++;
  else if (x1 > x2) newPos[0]--;

  if (y1 < y2) newPos[1]++;
  else if (y1 > y2) newPos[1]--;

  return newPos;
}

// Main
const input = readInput(9);
const commands: Array<[string, number]> = input
  .split("\n")
  .map((line) => line.split(" "))
  .map((t) => [t[0], parseInt(t[1])]);

// Part 1
let headPos: Position = [0, 0];
let tailPos: Position = [0, 0];
const visitedTailPos = new Set<string>();

for (let i = 0; i < commands.length; i++) {
  const [dir, value] = commands[i];

  for (let j = 0; j < value; j++) {
    headPos = moveDir(headPos, dir);
    tailPos = followPos(tailPos, headPos);
    visitedTailPos.add(getPosKey(tailPos));
  }
}

console.log(`Part 1: ${visitedTailPos.size}`);

// Part 2
const positions: Position[] = [...Array(10)].map(() => [0, 0]);
const visitedPositions = new Set<string>();

for (let i = 0; i < commands.length; i++) {
  const [dir, value] = commands[i];

  for (let j = 0; j < value; j++) {
    for (let k = 0; k < positions.length; k++) {
      if (k === 0) positions[k] = moveDir(positions[k], dir);
      else positions[k] = followPos(positions[k], positions[k - 1]);
    }

    const lastPos = positions.at(-1) ?? [0, 0];
    visitedPositions.add(getPosKey(lastPos));
  }
}

console.log(`Part 2: ${visitedPositions.size}`);
