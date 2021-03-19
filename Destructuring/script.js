//3:52
//**** Object Destructuring 1  */

let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); // 8
console.log(yearNeptuneDiscovered); // 1846

//**** Object Destructuring 2  */

let planetFacts = {
    numPlanets2: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };
  
let {numPlanets2, ...discoveryYears} = planetFacts;
console.log(discoveryYears);  //** returns object with {yearNeptuneDiscovered:1846, yearMarsDiscoverd: 1659)  */

//**** Object Destructuring 3  */

function getUserData({firstName, favoriteColor="green"}){
    return `Your name is ${firstName} and you like ${favoriteColor}`;
  }
  
  getUserData({firstName: "Alejandro", favoriteColor: "purple"}) //"Your name is Alejandro and you like purple"
  getUserData({firstName: "Melissa"}) // "Your name is Melissa and your favorite color is green"
  getUserData({}) // Your name is undefined and your favorite color is green


//**** Array Destructuring 1  */

let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); // Maya
console.log(second); // Marisa
console.log(third); // Chi

//**** Array Destructuring 2  */

let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
    "Raindrops on roses",
    "whiskers on kittens",
    "Bright copper kettles",
    "warm woolen mittens",
    "Brown paper packages tied up with strings"
  ]
  
  console.log(raindrops); // "Raindrops on roses"
  console.log(whiskers); // "whiskers on kittens"
  console.log(aFewOfMyFavoriteThings); // ["Bright copper kettles","warm woolen mittens","Brown paper packages tied up with strings"]

//**** Array Destructuring 3  */

let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // [10, 30,20]

//**** ES5 Assigning Variables to Object Properties  */

let obj = {
    numbers: {
        a:1, 
        b:2
    }
}
let {numbers:{a,b}} = obj; 
console.log(a,b)

//**** ES5 Array Swap  */

let [arr, temp] = [1,2];
console.log([arr, temp]);


//**** raceResults()  */

const raceResults = ([first, second, third, ...rest]) =>{ 
    return {
        first, 
        second, 
        third, 
        rest,
    }
}
console.log(raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre'])
)