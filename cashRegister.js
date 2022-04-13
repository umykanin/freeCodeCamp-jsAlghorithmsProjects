/*
Cash Register

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first 
argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due,
 or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change 
if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills,
 sorted in highest to lowest order, as the value of the change key.
Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
*/

function checkCashRegister(price, cash, cid) {
    // init data
    const STATUS = ['INSUFFICIENT_FUNDS', 'CLOSED', 'OPEN'];
    const UNITS = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
    let changeInit = JSON.parse(JSON.stringify(cid));
    changeInit.forEach(ele => ele[1] = 0);
    // all cash in the till
    let allCash = cid.reduce((a, b) => a + b[1], 0);
    // amount to give back
    let rest = cash - price;
    // giving back all the cash from till
    if (rest === allCash) {
        return {
            status: STATUS[1],
            change: cid
        }
    }
    // create the change object
    for (let i = cid.length - 1; i >= 0; i--) {
        if (rest > 0 && rest >= UNITS[i] && cid[i][1] > 0) {
            cid[i][1] = Math.round((cid[i][1] - UNITS[i]) * 100) / 100;
            changeInit[i][1] += UNITS[i];
            rest = Math.round((rest - UNITS[i]) * 100) / 100;
            i++;
        }
    }
    // giving back the change
    if (rest === 0) {
        // delete zero values, and sorting
        const change = changeInit.filter((ele) => ele[1] > 0).sort((a, b) => b[1] - a[1]);
        return {
            status: STATUS[2],
            change: change
        }
    }
    // not ehough funds or not able to create the change from coins and bills in the till 
    return {
        status: STATUS[0],
        change: []
    }
}


console.log(
    checkCashRegister(3.26, 100, [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]]));




// 335.41
/*
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]));

console.log(checkCashRegister(335.41, 335.41, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]));
*/