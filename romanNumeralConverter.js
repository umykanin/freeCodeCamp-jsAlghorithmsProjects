/*
Roman Numeral Converter

Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.
*/

function convertToRoman(num) {
    let res = '';
    // dividing num to decimal levels and sending each to the buildPart method
    const l = num.toString().length;
    for (let i = 1; i <= l; i++) {
        let decPoint = Math.pow(10, i);
        let mod = num % decPoint;
        num -= mod;
        res = buildPart(decPoint, mod) + res;
    }
    return res;
}
// building part of roman number on each decimal level
function buildPart(decPoint, num) {
    // tab to read the roman letters
    const romanTab = [
        ['', 'I', 'V', 'X'],
        ['', 'X', 'L', 'C'],
        ['', 'C', 'D', 'M'],
        ['', 'M']
    ];
    // initialize result to return
    let part = '';
    // decimal level to read from romanTab
    let dec = Math.log10(decPoint) - 1;
    // first digit of currnet number to determine how to build the result
    let firstDigit = num.toString()[0];
    let ind = firstDigit < 5 ? 0 : 2;
    let level = firstDigit % 5;
    // building result
    if (level === 4) {
        part = romanTab[dec][1] + romanTab[dec][ind === 0 ? 2 : 3];
    } else {
        part = romanTab[dec][ind];
        for (let i = 0; i < level; i++) {
            part += romanTab[dec][1];
        }
    }
    return part;
}

console.log(convertToRoman(10));
