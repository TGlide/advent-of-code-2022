import { invertMatrix } from "utils/array";
import { readInput } from "utils/io";

const input = readInput(8);
const grid = input
  .split("\n")
  .map((line) => line.split("").map((t) => parseInt(t)));
const invertedGrid = invertMatrix(grid);

// Part 1
let visible = grid.length * 2 + invertedGrid.length * 2 - 4; // Edges are always visible

for (let i = 1; i < grid.length - 1; i++) {
  const row = grid[i];

  for (let j = 1; j < row.length - 1; j++) {
    const col = invertedGrid[j];
    const tree = row[j];

    const visibleLeft = row.slice(0, j).every((t) => t < tree);
    const visibleRight = row.slice(j + 1).every((t) => t < tree);
    const visibleInRow = visibleLeft || visibleRight;

    const visibleUp = col.slice(0, i).every((t) => t < tree);
    const visibleDown = col.slice(i + 1).every((t) => t < tree);
    const visibleInCol = visibleUp || visibleDown;

    if (visibleInRow || visibleInCol) {
      visible++;
    }
  }
}

console.log(`Part 1: ${visible}`);

// Part 2
function calculateVisTrees(t: number, trees: Array<number>) {
  let visible = 0;

  for (let i = 0; i < trees.length; i++) {
    const ot = trees[i];

    if (ot < t) {
      visible++;
    } else {
      visible++;
      break;
    }
  }

  return visible;
}

let highestScenicScore = 0;
for (let i = 1; i < grid.length - 1; i++) {
  const row = grid[i];

  for (let j = 1; j < row.length - 1; j++) {
    const col = invertedGrid[j];
    const tree = row[j];

    const visLeft = calculateVisTrees(tree, row.slice(0, j).reverse());
    const visRight = calculateVisTrees(tree, row.slice(j + 1));
    const visUp = calculateVisTrees(tree, col.slice(0, i).reverse());
    const visDown = calculateVisTrees(tree, col.slice(i + 1));
    const score = visLeft * visRight * visUp * visDown;

    // console.log(`Tree ${tree} at (${i}, ${j}) has a score of ${score}`);
    // console.log(`  Vis left: ${visLeft}`);
    // console.log(`  Vis right: ${visRight}`);
    // console.log(`  Vis up: ${visUp}`);
    // console.log(`  Vis down: ${visDown}`);
    // console.log();

    if (score > highestScenicScore) {
      highestScenicScore = score;
    }
  }
}

console.log(`Part 2: ${highestScenicScore}`);
