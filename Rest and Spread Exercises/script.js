/Refactor
const filterOutOdds = (...nums) => nums.filter((num) => num % 2 === 0); //
// console.log(filterOutOdds(1,2,3,7,9,12,16))
//Find min
function findMin(nums) {
  return Math.min(...nums);
} //
// console.log(findMin([1, 3, -5, 4, 5, 6]));

//Merge Objects

const mergeObjects = (obj1, obj2) => (newObj = { ...obj1, ...obj2 }); //
// console.log(mergeObjects2({a:1, b:2}, {c:3, d:4}) )

//Double and return args

const doubleAndReturnArgs = (arr, ...nums) => [
  ...arr,
  ...nums.map((num) => num * 2),
];
// console.log(doubleAndReturnArgs([1,2,3],4,4))

//slice and dice
//remove a random element in the items array and return a new array without that item
//Had this one figured out but couldn't get the spread operator in there so I used the solution given

const removeRandom = (items) => {
  for (let i = items.length; i >= 0; i--) {
    items.splice(Math.floor(Math.random() * items.length), 1);
    return [...items];
  }
};



//
console.log(removeRandom([1, 2, 3, 4, 5, 6, 7]));
console.log(removeRandom(["this", "that", "here", "there"]));

//Extend - return new array with every item in array 1 and array 2
const extend = (arr1, arr2) => arr1.concat(...arr2); //

// addKeyVal - Return a new object with all the keys and values from obj and a new key/value pair
const addKeyVal = (obj, key, val) => {
  return { ...obj, [key]: val };
};

console.log(addKeyVal([{ name: "will", age: "39" }], "isDad", "yes"));

// Remove Key - Return a new object with a key removed // Used solution for this one
const removeKey = (obj, key) => obj.splice(obj.indexOf(key), 1);
console.log(removeKey([{ name: "will", age: "39" }, "age"]));

// Combine - Combine two objects and return a new object
const combine = (obj1, obj2) => (newObj = { ...obj1, ...obj2 });
// console.log(combine({a:1, b:2}, {c:3, d:4}) )

// Update - Return a new object with a modified key and value
const update = (obj, key, value) => ({...obj, [key] : value})
// console.log(update([{ name: "will", age: "39" }, "age", 40]));
