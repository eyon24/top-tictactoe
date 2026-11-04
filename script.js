const winCombos = [
  [[0][0], [0][1], [0][2]],
  [[0][0], [1][0], [2][0]],
  [[0][0], [1][1], [2][2]],
  [[0][2], [1][2], [2][2]],
  [[1][0], [1][1], [1][2]],
  [[2][0], [2][1], [2][2]],
  [[0][1], [1][1], [2][1]],
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
    },
    {
      name: playerTwoName,
      token: "X",
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

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name} has chosen ${row}, ${column}...`);
    board.chooseCell(row, column, getActivePlayer());

    switchPlayerTurn();
    printNewRound();
    isGameOver();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
};

const game = GameController("p1", "p2");

game.playRound(0, 1);
