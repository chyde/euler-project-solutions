const termsCountDictionary = { 1: 1, 0: 0 };
const sequenceStartLimit = 1000000;

const getNextCollatz = n => {
  return n % 2 === 0 ? n / 2 : 3 * n + 1;
};

const sequenceCollatz = (n, count) => {
  if (termsCountDictionary[n]) {
    return termsCountDictionary[n] + count;
  } else {
    return sequenceCollatz(getNextCollatz(n), count + 1);
  }
};

let longestChain = { term: 0, length: 0};

for (let n = 1; n < sequenceStartLimit; n++) {
  let termLength = sequenceCollatz(n, 0);
  termsCountDictionary[n] = termLength;
  if(longestChain.length < termLength) {
    longestChain = { term: n, length: termLength };
  }
}

console.log(longestChain);
