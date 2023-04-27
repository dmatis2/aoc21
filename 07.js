import { getFileContent, getDataAsArrayOfNumbers } from "./utils.js";

const getCountToPosition = (arr, toPosition) => {
  return arr
    .map((crabPos) => Math.abs(crabPos - toPosition))
    .reduce((acc, val) => acc + val);
};

const getCountToPositionWithSum = (arr, toPosition) => {
  return arr
    .map((crabPos) => {
      const val = Math.abs(crabPos - toPosition);
      return (val * (val + 1)) / 2;
    })
    .reduce((acc, val) => acc + val);
};

const first = (arr) => {
  let minCost = Number.POSITIVE_INFINITY;
  for (let i = 0; i < 1e4; i++) {
    const cost = getCountToPosition(arr, i);
    if (cost < minCost) minCost = cost;
  }
  return minCost;
};

const second = (arr) => {
  let minCost = Number.POSITIVE_INFINITY;
  for (let i = 0; i < 1e4; i++) {
    const cost = getCountToPositionWithSum(arr, i);
    if (cost < minCost) minCost = cost;
  }
  return minCost;
};

const data = getDataAsArrayOfNumbers(getFileContent("input.txt"), ",");
console.log(first(data));
console.log(second(data));
