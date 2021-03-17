/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.
*/

const arr = [
  { name: "Elie" },
  { name: "Tim" },
  { name: "Matt" },
  { name: "Colt" },
];
// ['Elie', 'Tim', 'Matt', 'Colt']

function extractValue(arr, key) {
  const nameArray = [];
  return arr.reduce(
    function (acc, cur) {
      nameArray.push(cur[key]);
      // console.log(nameArray)
      return nameArray;
    },
    [0]
  );
}
console.log(extractValue(arr, "name"));
/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count

Examples:
    vowelCount('Elie') // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/

function vowelCount(str) {
  let newObj = {};
  const vowels = Array.from(
    str
      .toLowerCase()
      .split("")
      .filter(function (w) {
        return (
          w[0] === "i" ||
          w[0] === "e" ||
          w[0] === "u" ||
          w[0] === "a" ||
          w[0] === "o"
        );
      })
  );
  vowels.reduce(
    function (accum, nextVowel) {
      if (newObj[nextVowel]) {
        newObj[nextVowel] += 1;
      } else {
        newObj[nextVowel] = 1;
      }
    },
    [0]
  );
  return newObj;
}
// console.log(vowelCount('Elie'))
// console.log(vowelCount('Tim'))
// console.log(vowelCount('hmmm'))
// console.log(vowelCount('I Am awesome and so are you)'))

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
    const arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
    
    
*/

function addKeyAndValue(arr, key, value) {
  arr.reduce(
    function (acc, cur) {
      return cur, (cur.title = value);
    },
    [0]
  );
  return arr;
}
// console.log(addKeyAndValue(arr, 'title', 'Instructor'))

/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray. 

Examples:
    
    function isEven(val){
        return val % 2 === 0;
    }
    
    const arr = [1,2,3,4,5,6,7,8];
    
    partition(arr, isEven) // [[2,4,6,8], [1,3,5,7]];
    
    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }
    
    
    partition(names, isLongerThanThreeCharacters) // [['Elie', 'Colt', 'Matt'], ['Tim']]
    */

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
const names = ["Elie", "Colt", "Tim", "Matt"];

function isEven(val) {
  return val % 2 === 0;
}

function isLongerThanThreeCharacters(val) {
  return val.length > 3;
}

function partition(arr, callback) {
  const firstSubArray = [];
  const secondSubArray = [];
  arr.reduce(function (acc, nextNum) {
      if(callback(nextNum)) {
          firstSubArray.push(nextNum)
      }
      else {
          secondSubArray.push(nextNum)
      }
  },[0]);
  return [firstSubArray, secondSubArray]
}
console.log(partition(arr2, isEven)); // [[2,4,6,8], [1,3,5,7]];)
console.log(partition(names, isLongerThanThreeCharacters)); // [['Elie', 'Colt', 'Matt'], ['Tim']])
