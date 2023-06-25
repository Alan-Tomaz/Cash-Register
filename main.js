function checkCashRegister(price, cash, cid) {
  //get the variable change between price and cash
  let varDiff = cash - price;
  //when a constant refence a variable the value never change
  const constDiff = varDiff;
  //Object that will be returned
  const objectReturn = {
    status: '',
    change: []
  }

//Arr with the values of the money
const moneyTypes = [
    ["ONE HUNDRED", 100], 
    ["TWENTY", 20], 
    ["TEN", 10], 
    ["FIVE", 5], 
    ["ONE", 1], 
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
    ]

//reverse the values in the array. Put the initial value in the end, and the final value in the begin
cid.reverse();

//sum var of the values in the cash-in-drawer
let cashSum = 0;

//sum the values in the cashSum var
for(let i = 0; i < cid.length; i++){
    cashSum += cid[i][1];
  }

//get the values of the moneyTypes with the spread operator and put in the var arrResult
const arrResult = [...moneyTypes];


//iterate each money type
for(let i = 0; i < moneyTypes.length; i++){
    //money to return
let money = 0; 
    //number of times this type of money can be used
let moneyQnt = cid[i][1]/moneyTypes[i][1]

//while difference be equal or greater than moneyTypes, do:
while(varDiff.toFixed(2) >= moneyTypes[i][1] && moneyQnt >= 1){
//difference between price and cash minus the value of the money itered;
varDiff -= moneyTypes[i][1];
//the money returned receive the value of the money itereted
money += moneyTypes[i][1];
//subtract the quantity of time this money type can be used;
moneyQnt--;
}
arrResult[i][1]= money;

}

//sum var of the arrResult
  let sumCashResult = 0;

  for(let i = 0; i<cid.length; i++){
  //iterate the cid arr and put the var of index 1 of the nested array in the arrResult on the sumCashResult var
    sumCashResult += arrResult[i][1];
  }

//if the cash-in-drawer is smaller than the originalDiff between price and cash OR the sumCashResult is smaller than the originalDiff between price and cash do:
  if(cashSum
   < constDiff || sumCashResult < constDiff){
    //add to the status property of the object the string 'INSUFFICIENT_FUNDS';
    objectReturn.status = 'INSUFFICIENT_FUNDS';
    }
    //else if cashSum is equal to originalDiff
    else if(cashSum == constDiff){
      //add to the status property of the object the string 'CLOSED' and add to the change property the cid array;
      objectReturn.status = 'CLOSED';
      //reverse the values of cid again. The values in the change property in the return need to start from the weakest currency type to the strongest one
      objectReturn.change = cid.reverse();
    }
      //else the cashSum is greaten than originalDiff do:
    else{
      //create the resultValues array who will receive the money which will be returned as change
      let resultValues =[];

//iterate in each index of the arrResult array
      for(let i = 0; i < arrResult.length; i++){
//if the nested array in the arrResult array in the index 1 (the value of the type money) is strict different to 0 the nested array is addicted to the resultValues Array;
        if(arrResult[i][1]!==0){
          resultValues.push(arrResult[i]);  
        } 
        }
        //change the status property of the object will be returned to the string 'OPEN' and the change property to the resultValues array
     objectReturn.status = 'OPEN';
     objectReturn.change = resultValues;
    }
    //return the objectReturn
     return objectReturn;
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
