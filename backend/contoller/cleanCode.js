/* eslint-disable no-lonely-if */
/** Deuxieme Methode */

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const convertToRoman = (num) => {
  // create key:value pairs
  const romanLookup = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };
  const roman = [];
  const romanKeys = Object.keys(romanLookup);
  let curValue;
  let index;
  let count = 1;
  console.log(romanKeys);

  for (const numeral in romanLookup) {
    curValue = romanLookup[numeral];
    index = romanKeys.indexOf(numeral);

    while (num >= curValue) {
      if (count < 4) {
        // push up to 3 of the same numeral
        roman.push(numeral);
      } else {
        // else we had to push four, so we need to convert the numerals
        // to the next highest denomination "coloring-up in poker speak"

        // Note: We need to check previous index because it might be part of the current number.
        // Example:(9) would attempt (VIIII) so we would need to remove the V as well as the I's
        // otherwise removing just the last three III would be incorrect, because the swap
        // would give us (VIX) instead of the correct answer (IX)
        if (roman.indexOf(romanKeys[index - 1]) > -1) {
          // remove the previous numeral we worked with
          // and everything after it since we will replace them
          roman.splice(roman.indexOf(romanKeys[index - 1]));
          // push the current numeral and the one that appeared two iterations ago;
          // think (IX) where we skip (V)
          roman.push(romanKeys[index], romanKeys[index - 2]);
        } else {
          // else Example:(4) would attemt (IIII) so remove three I's and replace with a V
          // to get the correct answer of (IV)

          // remove the last 3 numerals which are all the same
          roman.splice(-3);
          // push the current numeral and the one that appeared right before it; think (IV)
          roman.push(romanKeys[index], romanKeys[index - 1]);
        }
      }
      // reduce our number by the value we already converted to a numeral
      // eslint-disable-next-line no-param-reassign
      num -= curValue;
      count += 1;
    }
    count = 1;
  }
  console.log(roman);
  return roman.join('');
};

module.exports = convertToRoman;
