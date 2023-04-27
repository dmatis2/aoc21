import { getFileContent, getDataAsArray } from "./utils.js";

const transpose = (board) => {
  return board.map((_, colIndex) => board.map((row) => row[colIndex]));
};

const getSumOfUnmarked = (board, chosenNumbers) => {
  return board
    .map((row) =>
      row
        .filter((num) => !chosenNumbers.includes(num))
        .reduce((acc, x) => acc + x, 0)
    )
    .reduce((acc, x) => acc + x, 0);
};

const isWinningBoard = (board, chosenNumbers) => {
  let isWinningInSomeRow = board.some((row) =>
    row.every((num) => chosenNumbers.includes(num))
  );
  if (isWinningInSomeRow) {
    return [true, getSumOfUnmarked(board, chosenNumbers), chosenNumbers.at(-1)];
  }
  const transposedBoard = transpose(board);
  isWinningInSomeRow = transposedBoard.some((row) =>
    row.every((num) => chosenNumbers.includes(num))
  );
  if (isWinningInSomeRow) {
    return [
      true,
      getSumOfUnmarked(transposedBoard, chosenNumbers),
      chosenNumbers.at(-1),
    ];
  }
  return [false, 0, 0];
};

const parseInput = (arr) => {
  const numbers = arr[0].split(",").map((x) => parseInt(x));
  let boards = [];
  for (let row = 1; row < arr.length; row += 6) {
    boards = [
      ...boards,
      arr.slice(row + 1, row + 6).map((r) =>
        r
          .split(" ")
          .filter((s) => s !== "")
          .map((s) => parseInt(s))
      ),
    ];
  }
  return { numbers, boards };
};

const first = (game) => {
  for (let i = 0; i < game.numbers.length; i++) {
    const boards = game.boards.map((board) =>
      isWinningBoard(board, game.numbers.slice(0, i))
    );
    if (boards.some((status) => status[0])) {
      const winningBoard = boards.filter((status) => status[0])[0];
      return winningBoard[1] * winningBoard[2];
    }
  }
  return 0;
};

const second = (game) => {
  let chosenNumbers = game.numbers;
  while (chosenNumbers.length > 0) {
    const chosen = chosenNumbers.pop();
    const boards = game.boards.map((board) =>
      isWinningBoard(board, chosenNumbers)
    );
    if (boards.some((status) => !status[0])) {
      const losingBoard = boards
        .map((status, i) => [...status, i])
        .filter((status) => !status[0])[0];
      const winningBoard = isWinningBoard(game.boards[losingBoard[3]], [
        ...chosenNumbers,
        chosen,
      ]);
      return winningBoard[1] * winningBoard[2];
    }
  }
  return 0;
};

const data = parseInput(getDataAsArray(getFileContent("input.txt")));
console.log(first(data));
console.log(second(data));
