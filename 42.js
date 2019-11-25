var fs = require("fs");

//     at Object.<anonymous> (/Users/chyde2/Documents/playground/euler/42.js:3:23)

let fileContents = fs.readFileSync("/Users/chyde2/Documents/playground/euler/p042_words.txt", "utf8");
let words = fileContents.split(",");

console.log(words.length, words[100], words[100].replace(/\"/g, ""));

let triWordsCount = 0;
let triangleNumbers = [1];
let triangleN = 1;

for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
  const word = words[wordIndex].replace(/\"/g, ""); // var ret = "data-123".replace(/data-/g,'');
  let wordValue = 0;

  for (let characterIndex = 0; characterIndex < word.length; characterIndex++) {
    wordValue += word.charCodeAt(characterIndex) - 64;

  }

  while (wordValue > triangleNumbers[triangleNumbers.length - 1]) {
    triangleN++;
    // console.log((triangleN * (triangleN + 1)) / 2);
    triangleNumbers.push((triangleN * (triangleN + 1)) / 2);
  }

  if(triangleNumbers.indexOf(wordValue) > -1) {
    triWordsCount ++;
  }
}

console.log("triangleNumbers", triangleNumbers.length);
console.log("biggest", triangleNumbers[triangleNumbers.length -1]);
console.log("triWordsCount", triWordsCount);
