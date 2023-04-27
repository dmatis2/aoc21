import { getFileContent, getDataAsArray } from "./utils.js";

const parseInput = (arr) => {
  return arr.map((entry) => entry.split(" | ").map((part) => part.split(" ")));
};

const first = (arr) => {
  const easyNumbersLengths = new Set([2, 3, 4, 7]);
  const mappings = new Map([
    [2, 1],
    [3, 7],
    [4, 4],
    [7, 8],
  ]);
  // console.log(arr);
  let count = 0;
  arr.forEach((line) => {
    line[1].forEach((str) => {
      if (easyNumbersLengths.has(str.length)) count++;
    });
  });
  return count;
};

const second = (arr) => 0;

const data = parseInput(getDataAsArray(getFileContent("example.txt")));
console.log(first(data));
console.log(second(data));
console.assert(first(data) === 26, "Not matching first part");
console.assert(second(data) === 5353, "Not matching second part");
