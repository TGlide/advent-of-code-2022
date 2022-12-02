import { at, sum } from "utils/array";
import { readInput } from "utils/io";

const input = readInput(1);

const inputArr = input.split("\n");
const calories = inputArr.reduce<number[]>((acc, curr) => {
  if (!curr) {
    return [...acc, 0];
  }

  return [...acc.slice(0, acc.length - 1), (at(acc, -1) ?? 0) + Number(curr)];
}, []);

console.log(calories.sort((a, b) => b - a));
console.log(sum(calories.sort((a, b) => b - a).slice(0, 3)));
