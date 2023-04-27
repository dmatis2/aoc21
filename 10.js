/*
{([(<{}[<>[]}>{[]{[(<()>
*/
import { getFileContent, getDataAsArray } from "./utils.js";

const matchingBrackets = new Map([
  [")", "("],
  ["]", "["],
  ["}", "{"],
  [">", "<"],
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
]);

const first = (arr) => {
  const scoreTable = new Map([
    [")", 3],
    ["]", 57],
    ["}", 1197],
    [">", 25137],
  ]);
  const illegalCharacters = [];
  arr.forEach((line, i) => {
    const lineArr = line.split("");
    const stack = [];
    while (lineArr.length > 0) {
      const bracket = lineArr.shift();
      //   process.stdout.write(`${bracket} -> ${stack.join("")}\n`);
      if (")]}>".includes(bracket)) {
        if (stack.at(-1) !== matchingBrackets.get(bracket)) {
          //   console.log(
          //     `Expected ${matchingBrackets.get(stack.at(-1))}, got ${bracket}`
          //   );
          illegalCharacters.push(bracket);
          return;
        }
        // console.log("Popping stack");
        stack.pop();
        continue;
      }
      stack.push(bracket);
    }
  });
  return illegalCharacters
    .map((ch) => scoreTable.get(ch))
    .reduce((a, v) => a + v, 0);
};

const second = (arr) => {
  const scoreTable = new Map([
    [")", 1],
    ["]", 2],
    ["}", 3],
    [">", 4],
  ]);
  let scores = [];
  arr.forEach((line, i) => {
    const lineArr = line.split("");
    let stack = [];
    while (lineArr.length > 0) {
      const bracket = lineArr.shift();
      //   process.stdout.write(`${bracket} -> ${stack.join("")}\n`);
      if (")]}>".includes(bracket)) {
        if (stack.at(-1) !== matchingBrackets.get(bracket)) {
          //   console.log(
          //     `Expected ${matchingBrackets.get(stack.at(-1))}, got ${bracket}`
          //   );
          return;
        }
        // console.log("Popping stack");
        stack.pop();
        continue;
      }
      stack.push(bracket);
    }
    if (stack.length > 0) {
      stack = stack.map((ch) => matchingBrackets.get(ch)).reverse();
      scores.push(stack.reduce((a, v) => a * 5 + scoreTable.get(v), 0));
    }
  });
  scores = scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
};

const data = getDataAsArray(getFileContent("input.txt"));
console.log(first(data));
console.log(second(data));
console.assert(first(data) === 26397, "Not matching first part");
console.assert(second(data) === 288957, "Not matching second part");
