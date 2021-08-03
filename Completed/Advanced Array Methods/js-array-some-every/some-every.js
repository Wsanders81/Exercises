/*
Write a function called hasOddNumber which accepts an array and returns true if the array contains at least one odd number, otherwise it returns false.

Examples:
    hasOddNumber([1,2,2,2,2,2,4]) // true
    hasOddNumber([2,2,2,2,2,4]) // false
*/

function hasOddNumber(arr) {
    return arr.some(function(num){
        return num % 2 !== 0; 
    })
}
// console.log(hasOddNumber([1,2,2,2,2,2,4]))
// console.log(hasOddNumber([2,2,2,2,2,4]))
/*
Write a function called hasAZero which accepts a number and returns true if that number contains at least one zero. Otherwise, the function should return false

Examples:
    hasAZero(3332123213101232321) // true
    hasAZero(1212121) // false
*/

function hasAZero(num) {
   return num.toString().split("").some(function(val){
    return val === "0";
    
   
})
}


// console.log(hasAZero(3332123213101232321))
// console.log(hasAZero(1212121))
/*
Write a function called hasOnlyOddNumbers which accepts an array and returns true if every single number in the array is odd. If any of the values in the array are not odd, the function should return false. 

Examples:
    hasOnlyOddNumbers([1,3,5,7]) // true
    hasOnlyOddNumbers([1,2,3,5,7]) // false
*/

function hasOnlyOddNumbers(arr) {
    return arr.every(function(num){
        return num % 2 !== 0; 
    })
}
// console.log(hasOnlyOddNumbers([1,3,5,7]))
// console.log(hasOnlyOddNumbers([1,2,3,5,7]))

/*
Write a function called hasNoDuplicates which accepts an array and returns true if there are no duplicate values (more than one element in the array that has the same value as another). If there are any duplicates, the function should return false.

Examples:
    hasNoDuplicates([1,2,3,1]) // false
    hasNoDuplicates([1,2,3]) // true
*/

function hasNoDuplicates(arr) {
    return arr.every(function(num) {
        return arr.indexOf(num) === arr.lastIndexOf(num);
    })

}
// console.log( hasNoDuplicates([1,2,3,1]))
// console.log(hasNoDuplicates([1,2,3]))

/*
Write a function called hasCertainKey which accepts an array of objects and a key, and returns true if every single object in the array contains that key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
        {title: "Instructor", first: 'Matt', last:"Lane"}, 
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]
    
    hasCertainKey(arr,'first') // true
    hasCertainKey(arr,'isCatOwner') // false
*/
//Used solution. Looked at MDN for "in" operator to learn more about it. 

function hasCertainKey(arr, key) { 
    // console.log(arr, key)
    // console.log(arr)
    return arr.every(function(val) {
        // console.log(key, val)
        // return val.indexOf(key); 
        return key in val; 
    })
}
// console.log(hasCertainKey(arr,'first')) 
// console.log(hasCertainKey(arr,'isCatOwner'))
/*
Write a function called hasCertainValue which accepts an array of objects and a key, and a value, and returns true if every single object in the array contains that value for the specific key. Otherwise it should return false.

Examples:
    var arr = [
        {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
        {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
        {title: "Instructor", first: 'Matt', last:"Lane"}, 
        {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
    ]
    
    hasCertainValue(arr,'title','Instructor') // true
    hasCertainValue(arr,'first','Elie') // false
    
*/

var arr = [
    {title: "Instructor", first: 'Elie', last:"Schoppik"}, 
    {title: "Instructor", first: 'Tim', last:"Garcia", isCatOwner: true}, 
    {title: "Instructor", first: 'Matt', last:"Lane"}, 
    {title: "Instructor", first: 'Colt', last:"Steele", isCatOwner: true}
]

function hasCertainValue(arr, key, searchValue) {
    return arr.every(function(value) {
        console.log(value[key], searchValue); 
        return value[key] === searchValue; 
    })


}

console.log(hasCertainValue(arr,'title','Instructor'))
console.log(hasCertainValue(arr,'first','Elie'))