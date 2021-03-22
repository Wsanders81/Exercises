//****** MAPS AND SETS EXERCISE */

//* Quick question #1
new Set([1,1,2,2,3,4]) // will return [1,2,3,4]

//* Quick question #2 
// [...new Set("referee")].join("")// will return ['ref']

//* Quick question #3 
let m = new Map();
m.set([1,2,3], true); 
m.set([1,2,3], false);// m will return {{[1,2,3], true},{[1,2,3], false}}

//* hasDuplicate 
function hasDuplicate(arr) {
    const dupeArr = [...new Set (arr)];
    if (dupeArr.length === arr.length) {
        return false
    } else return true; 
}
// console.log(hasDuplicate([1,3,2, 1])); //True
// console.log(hasDuplicate([1,5,-1,4])); // False

//* vowelCount
function vowelCount(str) {
    const newMap = new Map();
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
      for (let vowel of vowels) {
         if(newMap.has(vowel)){
             newMap.set(vowel, newMap.get(vowel) +1)
         }
         else newMap.set(vowel, 1)
      }
      
      return newMap; 
}
console.log(vowelCount('awesome'))
console.log(vowelCount('colt'))
console.log(vowelCount('aaaaiiioooouuuu'))
