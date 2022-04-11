/*
Caesars Cipher

One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. 
In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. 
Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/

function rot13(str) {
  const ROT = 13;
  const charA = 'A'.charCodeAt();
  const charZ = 'Z'.charCodeAt();
  const difference = charZ - charA;
  // change only letters
  const pattern = /[^\W_]/;
  let arr = str.split('');
  let res = '';
  arr.forEach(element => {
    let e = element.charCodeAt();
    if (pattern.test(element)) {
      let a = e - ROT < charA
        ? String.fromCharCode(e + difference + 1 - ROT)
        : String.fromCharCode(e - ROT);
        res += a;
    } else {
      res += element;
    }
  });
  return res;
}

console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));

