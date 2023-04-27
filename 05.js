import { getFileContent, getDataAsArray } from "./utils.js";

const parseInput = (arr) => {
  const regex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;
  return arr.map((item) => {
    let { x1, x2, y1, y2 } = item.match(regex).groups;
    x1 = parseInt(x1);
    x2 = parseInt(x2);
    y1 = parseInt(y1);
    y2 = parseInt(y2);
    return [x1, y1, x2, y2];
  });
};

const first = (arr) => {
  const map = new Map();
  arr.forEach((vent, i) => {
    const [x1, y1, x2, y2] = vent;
    if (x1 === x2) {
      const [from, to] = [y1, y2].sort((a, b) => a - b);
      for (let y = from; y <= to; y++) {
        const newValue = map.has(`${x1},${y}`) ? map.get(`${x1},${y}`) + 1 : 1;
        map.set(`${x1},${y}`, newValue);
      }
      return;
    }
    if (x1 !== x2 && y1 !== y2) return;
    const [from, to] = [x1, x2].sort((a, b) => a - b);
    for (let x = from; x <= to; x++) {
      const newValue = map.has(`${x},${y1}`) ? map.get(`${x},${y1}`) + 1 : 1;
      map.set(`${x},${y1}`, newValue);
    }
  });
  return [...map.values()].filter((val) => val > 1).length;
};

const second = (arr) => {
  const map = new Map();
  arr.forEach((vent, i) => {
    const [x1, y1, x2, y2] = vent;
    if (x1 === x2) {
      const [from, to] = [y1, y2].sort((a, b) => a - b);
      for (let y = from; y <= to; y++) {
        const newValue = map.has(`${x1},${y}`) ? map.get(`${x1},${y}`) + 1 : 1;
        map.set(`${x1},${y}`, newValue);
      }
      return;
    }
    if (y1 === y2) {
      const [from, to] = [vent[0], vent[2]].sort((a, b) => a - b);
      for (let x = from; x <= to; x++) {
        const newValue = map.has(`${x},${vent[1]}`)
          ? map.get(`${x},${vent[1]}`) + 1
          : 1;
        map.set(`${x},${vent[1]}`, newValue);
      }
      return;
    }
    const slope = (y2 - y1) / (x2 - x1) > 0 ? 1 : -1;
    if (slope === 1) {
      // going up
      if (x1 < x2) {
        let y = y1;
        for (let x = x1; x <= x2; x++) {
          const newValue = map.has(`${x},${y}`) ? map.get(`${x},${y}`) + 1 : 1;
          map.set(`${x},${y}`, newValue);
          y++;
        }
        return;
      }
      let y = y2;
      for (let x = x2; x <= x1; x++) {
        const newValue = map.has(`${x},${y}`) ? map.get(`${x},${y}`) + 1 : 1;
        map.set(`${x},${y}`, newValue);
        y++;
      }
      return;
    }
    // going down
    if (x1 < x2) {
      let y = y1;
      for (let x = x1; x <= x2; x++) {
        const newValue = map.has(`${x},${y}`) ? map.get(`${x},${y}`) + 1 : 1;
        map.set(`${x},${y}`, newValue);
        y--;
      }
      return;
    }
    let y = y2;
    for (let x = x2; x <= x1; x++) {
      const newValue = map.has(`${x},${y}`) ? map.get(`${x},${y}`) + 1 : 1;
      map.set(`${x},${y}`, newValue);
      y--;
    }
  });
  return [...map.values()].filter((val) => val > 1).length;
};

const data = parseInput(getDataAsArray(getFileContent("input.txt")));
console.log(first(data));
console.log(second(data));
