
//Selectors
const gameContainer = document.getElementById("game");
const score = document.getElementById("score");


const button = document.getElementById("button-container");
// const hiScore = localStorage.getItem("score");
//Empty Arrays
let selectedCards = [];
let cardIds = [];
let totalMatches = [];
//Variables
let possibleMatches = 5;

let baseScore = 0;

let maxSelected = false; 

score.textContent = baseScore;


const IMAGES = [
  { source: "./cat1.jpg", id: "0" },
  { source: "./cat1.jpg", id: "0" },
  { source: "./cat2.jpg", id: "1" },
  { source: "./cat2.jpg", id: "1" },
  { source: "./cat3.jpg", id: "2" },
  { source: "./cat3.jpg", id: "2" },
  { source: "./cat4.jpg", id: "3" },
  { source: "./cat4.jpg", id: "3" },
  { source: "./cat5.jpg", id: "4" },
  { source: "./cat5.jpg", id: "4" },
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter); 

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledImages = shuffle(IMAGES);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(imageArray) {
  for (let i = 0; i < imageArray.length; i++) {
    // create a new div

    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");

    newDiv.classList.add("game-div");

    newImg.classList.add("hidden");
    newImg.setAttribute("src", shuffledImages[i].source);
    newImg.setAttribute("data-img", i);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
    newDiv.append(newImg);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  if(maxSelected=== true){
    return
  }
  const selectedCard = e.target;
  const selectedCardId = e.target.getAttribute("data-img");

  selectedCard.classList.remove("hidden");
  selectedCards.push(shuffledImages[selectedCardId].source);

  cardIds.push(selectedCardId);
  
  // Checking for a match
  if (selectedCards.length === 2) {
    maxSelected = true
    const allCards = document.querySelectorAll("img");
    const allDivs = document.querySelectorAll('div');
    const cardOne = cardIds[0];
    const cardTwo = cardIds[1];
    console.log(maxSelected)

    setTimeout(function () {
      if (selectedCards[0] === selectedCards[1] && cardOne !== cardTwo) {
        baseScore++;
        possibleMatches--;
        score.textContent = baseScore;
      } else {
        allCards[cardOne].classList.add("hidden");
        allCards[cardTwo].classList.add("hidden");
        baseScore++;
        score.textContent = baseScore;
      }

      if (possibleMatches === 0) {
        //
        
        score.textContent = baseScore;
        alert("Great Job! You matched all the cats!");
      }

      cardIds = [];
      selectedCards = [];
      maxSelected=false; 
    }, 1000);
    
  }
}

//Resetting the game
button.addEventListener("click", function () {
  selectedCards = []; // ?
  totalMatches = [];
  document.getElementById("game").innerHTML = "";
  shuffledImages = shuffle(IMAGES);
  createDivsForColors(shuffledImages);
  baseScore = 0;
  possibleMatches = 5;
});



// when the DOM loads
createDivsForColors(shuffledImages);
