import { getFileContent, getDataAsArrayOfNumbers } from "./utils.js";

const lanternfishCount = (arr, days = 80) => {
  let map = new Map();
  for (let i = 0; i <= 9; i++) {
    map.set(i, 0);
  }
  arr.forEach((day) => map.set(day, map.get(day) + 1));
  for (let x = 1; x <= days; x++) {
    const state = new Map();

    for (let i = 0; i < 9; i++) {
      state.set(i, map.get(i + 1));
    }
    state.set(6, state.get(6) + map.get(0));
    state.set(8, map.get(0));
    map = state;
  }
  return [...map.values()].reduce((a, v) => a + v, 0);
};

const first = (arr) => lanternfishCount(arr);

const second = (arr) => lanternfishCount(arr, 256);

const data = getDataAsArrayOfNumbers(getFileContent("input.txt"), ",");
console.log(first(data));
console.log(second(data));
