import { readFileSync } from "fs";

export function readActual(exerciseNumber: number) {
  return readFileSync(`./src/${exerciseNumber}/input.txt`, "utf8");
}

export function readExample(exerciseNumber: number) {
  return readFileSync(`./src/${exerciseNumber}/example.txt`, "utf8");
}

export function readInput(exerciseNumber: number, example: boolean = false) {
  return example ? readExample(exerciseNumber) : readActual(exerciseNumber);
}
