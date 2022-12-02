import { readFileSync } from "fs";

export function readInput(exerciseNumber: number) {
  return readFileSync(`./src/${exerciseNumber}/input.txt`, "utf8");
}
