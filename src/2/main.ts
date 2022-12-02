import { readInput } from "utils/io";
import { objectKeys } from "utils/object";

// Constants & Functions
const handsInfo = {
  rock: {
    points: 1,
    beats: "scissors",
    letters: ["A", "X"],
  },
  paper: {
    points: 2,
    beats: "rock",
    letters: ["B", "Y"],
  },

  scissors: {
    points: 3,
    beats: "paper",
    letters: ["C", "Z"],
  },
} as const;

type Hand = keyof typeof handsInfo;

function isHand(hand: unknown): hand is Hand {
  return typeof hand === "string" && hand in handsInfo;
}

function getHandByLetter(letter: string) {
  for (const hand of objectKeys(handsInfo)) {
    if (handsInfo[hand].letters.includes(letter as never)) {
      return hand;
    }
  }
}

function calculatePointsByHands(rounds: (Hand | undefined)[][]) {
  let points = 0;

  for (const [oppHand, yourHand] of rounds) {
    if (!isHand(oppHand) || !isHand(yourHand)) continue;

    points += handsInfo[yourHand].points;

    if (handsInfo[yourHand].beats === oppHand) {
      points += 6;
    } else if (oppHand === yourHand) {
      points += 3;
    }
  }

  return points;
}

function calculatePointsByLetters(rounds: string[][]) {
  let points = 0;

  for (const [oppLetter, yourLetter] of rounds) {
    const oppHand = getHandByLetter(oppLetter);
    if (!oppHand) continue;

    if (yourLetter === "X") {
      // Should lose
      const yourHand = handsInfo[oppHand].beats;
      points += handsInfo[yourHand].points;
    } else if (yourLetter === "Y") {
      // Should draw
      points += 3;
      points += handsInfo[oppHand].points;
    } else {
      // Should win
      points += 6;
      const yourHand = Object.entries(handsInfo).find(
        ([_, info]) => info.beats === oppHand
      )?.[0];

      if (!isHand(yourHand)) continue;
      points += handsInfo[yourHand].points;
    }
  }

  return points;
}

// Main
const input = readInput(2);

const roundsInLetters = input.split("\n").map((l) => l.split(" "));
const roundsInHands = roundsInLetters.map((p) => p.map(getHandByLetter));

console.log(`Part 1: ${calculatePointsByHands(roundsInHands)}`);
console.log(`Part 2: ${calculatePointsByLetters(roundsInLetters)}`);
