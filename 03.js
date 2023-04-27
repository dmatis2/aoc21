import { getFileContent, getDataAsArray } from "./utils.js";

const getMostCommon = (arr) => {
  if (arr.length === 0) return [];
  let state = Array(arr[0].length).fill(0);
  arr.forEach((x) => {
    x.split("").forEach((val, i) => {
      state[i] += parseInt(val);
    });
  });
  return state.map((y) =>
    y > arr.length / 2 ? 1 : y === arr.length / 2 ? 1 : 0
  );
};

const first = (arr) => {
  const state = getMostCommon(arr);
  const invertedState = state.map((y) => (y ? 0 : 1));
  return parseInt(state.join(""), 2) * parseInt(invertedState.join(""), 2);
};

const second = (x) => {
  let [oxygen, co2] = [x, x];
  let curBit = 0;
  let co = getMostCommon(x)[curBit];
  let oxy = co;
  while (oxygen.length > 1 && co2.length > 1) {
    oxygen = oxygen.filter((val) => parseInt(val[curBit]) === oxy);
    co2 = co2.filter((val) => parseInt(val[curBit]) !== co);
    ++curBit;
    oxy = getMostCommon(oxygen)[curBit];
    co = getMostCommon(co2)[curBit];
  }
  while (oxygen.length > 1) {
    oxygen = oxygen.filter((val) => parseInt(val[curBit]) === oxy);
    ++curBit;
    oxy = getMostCommon(oxygen)[curBit];
  }
  while (co2.length > 1) {
    co2 = co2.filter((val) => parseInt(val[curBit]) !== co);
    ++curBit;
    co = getMostCommon(co2)[curBit];
  }
  return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
};

const data = getDataAsArray(getFileContent("input.txt"));
console.log(first(data));
console.log(second(data));
