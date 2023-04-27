import * as fs from "fs";

export const getFileContent = (location) => {
  return fs.readFileSync(location, "utf8");
};

export const getDataAsArray = (data, separator = "\n") => {
  return data.split(separator);
};

export const getDataAsArrayOfNumbers = (data, separator = "\n") => {
  return data.split(separator).map((x) => parseInt(x));
};
