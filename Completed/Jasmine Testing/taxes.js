function calculateTaxes(income) {
  if(!Number.isFinite(income)){
    throw new Error('Invalid Income')
  }
  if (income > 30000) {

    return income * 0.25;
  } else {
    return income * 0.15;
  }
}

console.log(calculateTaxes(500))

function removeDupes(values) {

  const arr = [...new Set(values)]
  if(typeof values === 'string')  return arr.join('') 
  return arr; 
}

function remove(arr, val){
  return arr.filter((el) => {
    return el !== val
  })
}

let names = [];
let nameInput = document.getElementById('nameInput');
function submitForm() {
  names.push(nameInput.value);
}

