/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;
let gameWon = false;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
const resetButton = document.getElementById("reset");
const htmlBoard = document.getElementById("board");
const pOneSection = document.getElementById('player-1'); 
const pTwoSection = document.getElementById('player-2'); 




function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //referenced from Stack Overflow
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // TODO: add comment for this code
  //creating dashed bordered top cells for each of the seven columns on the game board
  let top = document.createElement("tr");
  //setting attributes of id for dynamic id to be set in for loop
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //creating a loop to insert headCell (top row) based on width of HTML board of 7
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    //assigning each headCell with a dynamic id based off of index within the for loop
    headCell.setAttribute("id", x);
    //append the head cell to to the top of the table
    top.append(headCell);
  }
  //Lets stick all those cells on top now
  htmlBoard.append(top);

  // TODO: add comment for this code
  // Use a loop to create and insert HEIGHT (6) rows WIDTH (7) td wide
  for (let y = 0; y < HEIGHT; y++) {
    //create the 6 rows
    const row = document.createElement("tr");
    // use a loop within the row to create table cells ('td') using WIDTH variable (6)
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //Use template literal to dynamically assign id's to the table cells y-where in the index of the row number they are and x-where they are in the index of the cell, or width of the html board.
      cell.setAttribute("id", `${y}-${x}`);
      //append all new cells to previous cell
      row.append(cell);
    }
    //Then append each row beneath the last one
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (board[i][x] === undefined) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece", `p${currPlayer}`);

  const where = document.getElementById(`${y}-${x}`);
  
  where.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message

  gameWon = true;
  setTimeout(() => {
    alert(`${msg}`);
  }, 500);
}
//** Reset game */
resetButton.addEventListener("click", function (e) {
  e.preventDefault();
  currPlayer = 1; 
  gameWon = false;
  pTwoSection.classList.remove('currplayer'); 
  pOneSection.classList.add('currplayer');
  $(".piece").remove();
  board = [];
  makeBoard();
});

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  const top = document.getElementById("top-column");
  if (gameWon === true) {
    top.removeEventListener("click", handleClick, true);
  }

  

  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //** I tried a different approach with this one by checking if all elements in the board array were numbers but it kept coming back as false so I went with the solution answer.:(  */

  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("It's a TIE!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  
  
  if (currPlayer === 1) {    
    currPlayer = 2;
  } else if (currPlayer === 2) {
    currPlayer = 1;
  }
  //Toggle background to show which player is currently active
  if(currPlayer === 1) {
    pOneSection.classList.add('currplayer');
    pTwoSection.classList.remove('currplayer');
  } else  {
    pOneSection.classList.remove('currplayer'); 
    pTwoSection.classList.add('currplayer');
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //loop over[board] vertically
  for (let y = 0; y < HEIGHT; y++) {
    //loop over [board] horizontally
    for (let x = 0; x < WIDTH; x++) {
      //checking incrementally from start position across x-axis up to four spaces
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //checking incrementally up the the y-axis
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //checking forward diagonally
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      //Checking backwards diagonally
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


makeBoard();
makeHtmlBoard();
