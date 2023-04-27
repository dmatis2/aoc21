import { getFileContent, getDataAsArray } from "./utils.js";

const first = (arr) => 0;

const second = (arr) => 0;

const data = getDataAsArray(getFileContent("example.txt"));
console.log(first(data));
console.log(second(data));
console.assert(first(data) === 0, "Not matching first part");
console.assert(second(data) === 0, "Not matching second part");
