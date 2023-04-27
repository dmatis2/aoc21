import { getFileContent, getDataAsArrayOfNumbers } from "./utils.js";

const first = (x) =>
  x.reduce(
    (acc, val, i) => (i === 0 ? acc : x[i - 1] < val ? acc + 1 : acc),
    0
  );

const sum = (arr) => arr.reduce((acc, x) => acc + x, 0);

const second = (x) =>
  x.reduce((acc, val, i) => {
    if (i === 0) return acc;
    if (i + 2 === x.length) return acc;
    if (sum(x.slice(i - 1, i + 2)) < sum(x.slice(i, i + 3))) return acc + 1;
    return acc;
  }, 0);

const data = getDataAsArrayOfNumbers(getFileContent("input.txt"));
console.log(first(data));
console.log(second(data));
