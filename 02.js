import { getFileContent, getDataAsArray } from "./utils.js";

const regex = /(?<cmd>forward|down|up) (?<count>\d)/;

const first = (x) => {
  let state = [0, 0]; // [x, y]
  x.forEach((y) => {
    const { cmd, count } = y.match(regex).groups;
    const num = parseInt(count);
    if (cmd === "forward") state[0] += num;
    if (cmd === "down") state[1] += num;
    if (cmd === "up") state[1] -= num;
  });
  return state[0] * state[1];
};

const second = (x) => {
  let state = [0, 0, 0]; // [x, y, aim]
  x.forEach((y) => {
    const { cmd, count } = y.match(regex).groups;
    const num = parseInt(count);
    if (cmd === "down") state[2] += num;
    if (cmd === "up") state[2] -= num;
    if (cmd === "forward") {
      state[0] += num;
      state[1] += state[2] * num;
    }
  });
  return state[0] * state[1];
};

const data = getDataAsArray(getFileContent("input.txt"));
console.log(first(data));
console.log(second(data));
