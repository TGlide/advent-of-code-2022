import { at } from "utils/array";
import { readExample, readInput } from "utils/io";
import { objectKeys } from "utils/object";

// Helpers
type FileSystem = {
  [x: string]: FileSystem | number;
};

function cd(fileSys: FileSystem, path: Array<string>): FileSystem[string] {
  const key = at(path, 0) as string;

  if (path.length === 1) {
    if (!fileSys?.[key]) {
      fileSys[key] = {};
    }

    return fileSys[key];
  }

  return cd(fileSys[key] as FileSystem, path.slice(1));
}

function buildFileSystem(commands: Array<string>) {
  let fileSys: FileSystem = {};
  let history: Array<string> = [];
  let currentDir: FileSystem[string] = fileSys;

  const fileRegex = /(\d+) (.+)/;

  for (let i = 0; i < commands.length; i++) {
    const line = commands[i];
    const fileMatch = line.match(fileRegex);

    if (line.startsWith("$ cd")) {
      const [, , dir] = line.split(" ");

      if (dir === "..") {
        history.pop();
      } else if (dir === "/") {
        history = ["/"];
      } else {
        history.push(dir);
      }

      currentDir = cd(fileSys, history);
    }

    if (fileMatch) {
      const [_, size, name] = fileMatch;

      if (typeof currentDir === "object") {
        currentDir[name] = parseInt(size);
      }
    }
  }

  return fileSys;
}

function getFileSystemDirectories(
  fileSys: FileSystem,
  keys: Array<string> = []
): FileSystem {
  let res: FileSystem = {};

  for (const key in fileSys) {
    const path = [...keys, key].join("/");
    if (typeof fileSys[key] === "object") {
      res[path] = fileSys[key];
      res = {
        ...res,
        ...getFileSystemDirectories(fileSys[key] as FileSystem, [...keys, key]),
      };
    }
  }

  return res;
}

function getFileSystemSize(fileSys: FileSystem): number {
  let res = 0;

  for (const key in fileSys) {
    if (typeof fileSys[key] === "number") {
      res += fileSys[key] as number;
    } else {
      res += getFileSystemSize(fileSys[key] as FileSystem);
    }
  }

  return res;
}

// Main
const input = readInput(7);
const lines = input.split("\n");

const fileSys = buildFileSystem(lines);

const allDirs = getFileSystemDirectories(fileSys);
const dirsSize: [string, number][] = objectKeys(allDirs).map((dir) => {
  return [dir, getFileSystemSize(allDirs[dir] as FileSystem)];
});
const dirsSizeMap = Object.fromEntries(dirsSize);

// Part 1
const sumAtMost100000 = dirsSize.reduce((acc, [_, size]) => {
  if (size <= 100000) {
    return acc + size;
  }

  return acc;
}, 0);

console.log(`Part 1: ${sumAtMost100000}`);

// Part 2
const totalSpace = 70000000;
const neededUnused = 30000000;
const currUnused = totalSpace - dirsSizeMap["/"];
const deltaUnused = neededUnused - currUnused;

let smallest = Infinity;
for (const [_, size] of dirsSize) {
  if (size < smallest && size >= deltaUnused) {
    smallest = size;
  }
}
console.log(`Part 2: ${smallest}`);
