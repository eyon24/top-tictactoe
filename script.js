const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

const Gameboard = () => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const chooseCell = (row, column, player) => {
    if (board[row][column].getValue() === "") {
      board[row][column].addToken(player);
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, chooseCell, printBoard };
};

function Cell() {
  let value = "";

  const addToken = (player) => {
    value = player.token;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

const GameController = (playerOneName, playerTwoName) => {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      token: "O",
      moves: [],
    },
    {
      name: playerTwoName,
      token: "X",
      moves: [],
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const generateSquareNumber = (r, c) => {
    let row = parseInt(r);
    let column = parseInt(c);
    if (row === 0) {
      if (column === 0) {
        return 0;
      } else if (column === 1) {
        return 1;
      } else if (column === 2) {
        return 2;
      }
    } else if (row === 1) {
      if (column === 0) {
        return 3;
      } else if (column === 1) {
        return 4;
      } else if (column === 2) {
        return 5;
      }
    } else if (row === 2) {
      if (column === 0) {
        return 6;
      } else if (column === 1) {
        return 7;
      } else if (column === 2) {
        return 8;
      }
    }
  };

  const checkWinner = () => {
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      if (
        WINNING_COMBOS[i].every((num) => getActivePlayer().moves.includes(num))
      ) {
        return true;
      }
    }
    return;
  };

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} has chosen ${row}, ${column}...`);
    board.chooseCell(row, column, getActivePlayer());
    getActivePlayer().moves.push(generateSquareNumber(row, column));

    if (checkWinner()) {
      console.log(getActivePlayer().name + " is the winner!");
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    checkWinner,
    getBoard: board.getBoard,
  };
};

function ScreenController() {
  const game = GameController("P1", "P2");
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    if (game.checkWinner()) {
      playerTurnDiv.textContent = `${activePlayer.name}'s wins!!!`;
    } else {
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
    }

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");

        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    const board = game.getBoard();

    if (!selectedColumn) return;

    if (!game.checkWinner()) {
      if (board[selectedRow][selectedColumn].getValue() === "") {
        game.playRound(selectedRow, selectedColumn);
      }
    }

    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();
}

ScreenController();
