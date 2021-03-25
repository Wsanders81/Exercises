
// let WIDTH = 7;
// let HEIGHT = 6;
// let gameWon = false;
// let currPlayer = 1; // active player: 1 or 2
// let board = []; // array of rows, each row is array of cells  (board[y][x])


const resetButton = document.getElementById("reset");
const htmlBoard = document.getElementById("board");
const pOneSection = document.getElementById('player-1'); 
const pTwoSection = document.getElementById('player-2'); 



class Game {
  constructor(p1, p2) {
    
    this.WIDTH = 6; 
    this.HEIGHT = 7;
    this.players = [p1, p2]
    this.gameWon = false; 
    this.currPlayer = p1; 
    this.makeBoard();
    this.makeHtmlBoard();
    this.self = this
    console.log(p1, p2)
    
  }
  
  makeBoard() {
    this.board = [];
    
    for (let i = 0; i < this.HEIGHT; i++) {
      this.board.push(Array.from({ length:this. WIDTH }));
      
    }
  }
   findSpotForCol(x) {
     console.log(x)
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        
        return y;
      }
    }
    return null;
  }

  makeHtmlBoard() {
    
    let top = document.createElement("tr");
    //Store reference to handleClick bound function to remove event listener later. 
    this.handleGameClick = this.handleClick.bind(this);
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick);
    // resetButton.addEventListener("click", this.reset(),false)
    
    for (let x = 0; x < this.WIDTH; x++) {
      let headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      
      top.append(headCell);
    }
    htmlBoard.append(top);
  
    
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }

 

  placeInTable(y, x) {
    
    const where = document.getElementById(`${y}-${x}`);
    const piece = document.createElement("div");
    piece.classList.add('piece')
    piece.style.backgroundColor = this.currPlayer.color;
  
    console.log(where)
    where.append(piece);
  }

  endGame(msg) {
      
    this.gameWon = true;
    setTimeout(() => {
      alert(`${msg}`);
    }, 500);
      // const top = document.querySelector('#column-top')
      // top.removeEventListener("click", this.handleGameClick);
      }

  handleClick=(evt) =>{
    const top = document.getElementById("top-column");
    if(this.gameWon === true) {
      top.removeEventListener("click", this.handleGameClick) 
    }
    
  
    
  
    // get x from ID of clicked cell
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    console.log(this.currPlayer)
    this.placeInTable(y, x);
    this.board[y][x] = this.currPlayer;
  
    // check for win
    if (this.checkForWin()) {
      this.gameWon = true; 
      return this.endGame(`Player ${this.currPlayer.color} won!`);
      
    }
  
    // check for tie
    
  
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("It's a TIE!");
    }
  
    // switch player
    
    this.currPlayer =
      this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  
    // if (this.currPlayer === this.players[0]) {    
    //   this.currPlayer=this.players[0];
    // } else if (this.currPlayer === this.players[1]) {
    //   this.currPlayer=this.players[1];
    // }
    //Toggle background to show which player is currently active
    if(this.currPlayer == this.players[0]) {
      pOneSection.classList.add('currplayer');
      pTwoSection.classList.remove('currplayer');
    } else  {
      pOneSection.classList.remove('currplayer'); 
      pTwoSection.classList.add('currplayer');
    }
    
  }
  
  checkForWin() {
    const _win = (cells)=> {
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }
  
    for (let y = 0; y < this.HEIGHT; y++) {
      //loop over [board] horizontally
      for (let x = 0; x < this.WIDTH; x++) {
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
  
  
  
  
  
}
const reset = function () {

Game.currPlayer = 1; 
Game.gameWon = false;
pTwoSection.classList.remove('currplayer'); 
pOneSection.classList.add('currplayer');
if(document.querySelector('#board')){
  //  {$(".#board").remove();}
  const gameBoard = document.querySelector('#board'); 
  gameBoard.innerHTML = "";}
Game.board = [];

}

class Player {
  constructor(color="#000000") {
    this.color = color; 
  }
}
const p2Section = document.getElementById('p2-color');
const p1Section = document.getElementById('p1-color');
let p1Color; 
let p2Color; 
p1Color = p1Section.addEventListener('input', ()=> p1Color = p1Section.value)
p2Section.addEventListener('input', ()=> p2Color = p2Section.value)

document.getElementById('start').addEventListener('click', function(){
  let p1 = new Player(p1Color);
  let p2 = new Player(p2Color);
  reset();
  new Game(p1, p2)
})
//** Reset game */
// resetButton.addEventListener("click", function (e) {
//   e.preventDefault();
//   currPlayer = 1; 
//   gameWon = false;
//   pTwoSection.classList.remove('currplayer'); 
//   pOneSection.classList.add('currplayer');
//   $(".piece").remove();
//   board = [];
//   makeBoard();
// });

// makeBoard();
// makeHtmlBoard();

