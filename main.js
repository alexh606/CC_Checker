// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

const validateCred = arr => {
  let checkSum = arr[arr.length - 1]; //this saves the checksum in a variable
  let arrNew = arr.slice(0, arr.length -1); //this creates a new array without the checksum and stores it in a variable
  arrNew.reverse(); //this reverses the order of the new array
  
  let arrOdd = []; //used to store the array at only odd indices so these can be multiplied
  let arrOdd9 = []; //used to store the array of odd indices following multiplication, so they can be -9'd if over 9
  let arrEven = []; //used to store the numbers at even indices

  for(let i = 0; i < arrNew.length; i += 2) {
    let temp = arrNew[i] * 2;
    arrOdd.push(temp);
    }; //this for loop takes all numbers at odd indices and puts them into arrOdd and multiplies them. 

  for(let i = 0; i < arrOdd.length; i++){
    if(arrOdd[i] >= 9){
      let temp = arrOdd[i] - 9;
      arrOdd9.push(temp);
  } else {
    let temp = arrOdd[i];
    arrOdd9.push(temp);
  }; //this for/if/else loop takes the multiplied odd indices and minus 9 if above 9 and adds them into arrOdd9. 
  };

  for(let i = 1; i < arrNew.length; i += 2){
    let temp = arrNew[i];
    arrEven.push(temp);
  }; //this for loop adds the numbers at even indices into arrEven array

  let arrFull = arrOdd9.concat(arrEven);//combine odds and evens into one array

  let total = checkSum //variable to contain sum of arrFull holding value of the checkSum
  for(let i = 0; i < arrFull.length; i++){
    total += arrFull[i]; 
  }; //this for loop calculates the sum of arrFull and adds it to checkSum

  const result = total % 10; //calculates modulo of sum of arrFul plus checkSum

  if(result === 0){
    return true;
  }else {
    return false;
}; //this returns true if modulo is 0. False if not. Indicating if card number is valid or not. 
};


const findInvalidCards = arr => {
  let invalidList = []; //this will contain the new array of invalid cards
  for(let i = 0; i < arr.length; i++){
      let temp = validateCred(arr[i]);
        if(temp === false){
          invalidList.push(arr[i]);
        }
  } return invalidList;
}; //this function loops through a nested array provided. It runs validateCred function on each array and, if false, pushes that array to the invalidList array. 

const idInvalidCardCompanies = arr => {
  let invalidCompanyList = []; //this will contain the list of invalid cards associated with their company
  for(let i = 0; i < arr.length; i++){
    let temp = arr[i];
    if(temp[0] === 3){
      invalidCompanyList.push('Amex (American Express)');
    } else if(temp[0] === 4) {
      invalidCompanyList.push('Visa');
    } else if(temp[0] === 5){
      invalidCompanyList.push('Mastercard');
    } else if(temp[0] === 6){
      invalidCompanyList.push('Discover');
    } else {
      invalidCompanyList.push('Company not found');
    };
  }; 
  
  let unique = []; //contains the unqiue list of invalid companies
  invalidCompanyList.forEach(element => {
    if (!unique.includes(element)){
      unique.push(element)
      }
    });
  invalidCompanyList = unique;
  return invalidCompanyList
}; //runs through the invalid list and only pushes to unique if they don't already exist. 

console.log(idInvalidCardCompanies(findInvalidCards(batch)));







