import { getFileContent, getDataAsArray } from "./utils.js";

const parseInput = (arr) =>
  arr.map((row) => row.split("").map((num) => parseInt(num)));

const getLowestPoints = (arr) => {
  const lowestPoints = [];
  for (let x = 0; x < arr[0].length; x++) {
    for (let y = 0; y < arr.length; y++) {
      let possiblePoints = [];
      for (let x1 = -1; x1 <= 1; x1++) {
        for (let y1 = -1; y1 <= 1; y1++) {
          if (x1 === 0 && y1 === 0) continue;
          if (x + x1 < 0 || x + x1 >= arr[0].length) continue;
          if (y + y1 < 0 || y + y1 >= arr.length) continue;
          if (Math.abs(x1) === Math.abs(y1)) continue;
          possiblePoints.push(arr[y + y1][x + x1]);
        }
      }
      if (possiblePoints.every((num) => num > arr[y][x]))
        lowestPoints.push([y, x]);
    }
  }
  return lowestPoints;
};

const getBasinCountForLowPoint = (arr, lowpoint) => {
  const [y, x] = lowpoint;
  //   console.log(`Testing lowpoint [${y}, ${x}]`);
  //   console.log(arr);
  const value = arr[y][x];
  let queue = [[y, x]];
  let visited = new Set();
  while (queue.length > 0) {
    const [curY, curX] = queue.pop();
    if (visited.has(JSON.stringify([curY, curX]))) continue;
    for (let x1 = -1; x1 <= 1; x1++) {
      for (let y1 = -1; y1 <= 1; y1++) {
        if (x1 === 0 && y1 === 0) continue;
        if (curX + x1 < 0 || curX + x1 >= arr[0].length) continue;
        if (curY + y1 < 0 || curY + y1 >= arr.length) continue;
        if (Math.abs(x1) === Math.abs(y1)) continue;
        if (arr[curY + y1][curX + x1] === 9) continue;
        if (value > arr[curY + y1][curX + x1]) continue;
        // console.log(
        //   `Pridavam [${curY + y1}, ${curX + x1}] s hodnotou ${
        //     arr[(curY + y1, curX + x1)]
        //   }`
        // );
        queue.push([curY + y1, curX + x1]);
      }
    }
    visited.add(JSON.stringify([curY, curX]));
  }
  return visited.size;
};

const first = (arr) => {
  const lowestPoints = getLowestPoints(arr);
  return lowestPoints
    .map((v) => arr[v[0]][v[1]])
    .reduce((a, v) => a + parseInt(v) + 1, 0);
};

const second = (arr) => {
  const lowestPoints = getLowestPoints(arr);
  const basins = lowestPoints
    .map((v) => getBasinCountForLowPoint(arr, v))
    .sort((a, b) => a - b);
  return basins
    .reverse()
    .slice(0, 3)
    .reduce((a, v) => a * v, 1);
};

const data = parseInput(getDataAsArray(getFileContent("input.txt")));
console.log(first(data));
console.log(second(data));
console.assert(first(data) === 15, "Not matching first part");
console.assert(second(data) === 1134, "Not matching second part");
