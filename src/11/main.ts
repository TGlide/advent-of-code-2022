import { multiply, range, remove, splitInChunks } from "utils/array";
import { readInput } from "utils/io";
import { clone } from "utils/object";

type MonkeyTest = {
  divisibleBy: number;
  ifTrue: number;
  ifFalse: number;
};

type Monkey = {
  items: number[];
  operation: string;
  test: MonkeyTest;
};

function execOperation(operation: string, item: number): number {
  const res = eval(operation.replace("new =", "").replaceAll("old", `${item}`));

  return res;
}

// Main
const input = readInput(11, false);
const monkeyInputs = input.split("Monkey ");

const monkeys: Monkey[] = [];

for (const mi of monkeyInputs) {
  const match = mi.match(
    /(\d):.*Starting items:\s(.*?)\n.*?Operation:(.*?)\n.*?Test: divisible by (\d+).*?monkey (\d+).*?monkey (\d+)/s
  );
  if (!match) continue;

  monkeys.push({
    items: match[2].split(", ").map((i) => parseInt(i)),
    operation: match[3].trim(),
    test: {
      divisibleBy: parseInt(match[4]),
      ifTrue: parseInt(match[5]),
      ifFalse: parseInt(match[6]),
    },
  });
}

function getInspections(monkeys: Monkey[], rounds: number, divideBy3 = true) {
  const monkeysObj = clone(monkeys);
  const lcm = monkeysObj.reduce((acc, curr) => {
    return acc * curr.test.divisibleBy;
  }, 1);

  let inspections: number[] = [];
  for (let i = 0; i < rounds; i++) {
    monkeysObj.forEach((m, j) => {
      let newItems: Array<number | null> = [...m.items];
      m.items.forEach((item, k) => {
        // Monkey ${j} inspects an item with a worry level of ${item}.`
        inspections[j] = inspections[j] ? inspections[j] + 1 : 1;

        // Worry level goes from ${item} to ${newV}.
        let newV = execOperation(m.operation, item);

        // Monkey gets bored with item. Worry level is divided by 3 to ${newV}.`
        if (divideBy3) {
          newV = Math.floor(newV / 3);
        }

        // Current worry level is${isDivisible ? "" : " not"} divisible by ${m.test.divisibleBy}.`
        const isDivisible = newV % m.test.divisibleBy === 0;

        // Item with worry level ${newV} is thrown to monkey ${newMonkeyIdx}.`
        const newMonkeyIdx = isDivisible ? m.test.ifTrue : m.test.ifFalse;
        monkeysObj[newMonkeyIdx].items.push(newV % lcm);
        newItems[k] = null;
      });

      m.items = newItems.filter((n) => n !== null) as number[];
    });
  }

  return inspections;
}

const inspectionsPt1 = getInspections(monkeys, 20);
inspectionsPt1.forEach((insp, i) => {
  console.log(`Monkey ${i} inspected items ${insp} times.`);
});

let topTwoActiveMonkeys = inspectionsPt1.reduce<[number, number]>(
  (acc, curr) => {
    const smallestIdx = acc[0] < acc[1] ? 0 : 1;

    if (curr > acc[smallestIdx]) {
      acc[smallestIdx] = curr;
    }

    return acc;
  },
  [0, 0]
);

console.log(`\nPart 1: ${multiply(topTwoActiveMonkeys)}\n`);

// Part 2
const inspectionsPt2 = getInspections(monkeys, 10000, false);
inspectionsPt2.forEach((insp, i) => {
  console.log(`Monkey ${i} inspected items ${insp} times.`);
});

topTwoActiveMonkeys = inspectionsPt2.reduce<[number, number]>(
  (acc, curr) => {
    const smallestIdx = acc[0] < acc[1] ? 0 : 1;

    if (curr > acc[smallestIdx]) {
      acc[smallestIdx] = curr;
    }

    return acc;
  },
  [0, 0]
);

console.log(`\nPart 2: ${multiply(topTwoActiveMonkeys)}`);
