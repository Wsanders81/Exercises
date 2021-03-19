//**** Same keys and values */
function createInstructor(firstName, lastName) {
    return {
        firstName, 
        lastName
    }
}
console.log(createInstructor("Bob", "Ross"));

//**** Computed Property Names */

function favoriteNumber(faveNum) {
    return {
        firstName: "Jason", 
        lastName: "Voorhees", 
        [faveNum]: "That is my favorite!"
    }
}
console.log(favoriteNumber(13)); 

//**** Object Methods */

let boyBand = {
    bandName: "NSYNC", 
    sayHi(){
        return "Hi!"
    }, 
    sayBye() {
        return `${this.bandName} says BYE, BYE, BYE!`
    }
}
console.log(boyBand.sayHi(), boyBand.sayBye()); 

//**** createAnimal function */

function createAnimal(species, verb, noise) {
    return {
        species, 
        [verb]:noise
    }
}
console.log(createAnimal('dog', 'bark', 'woof!'))