const parseSingleDigit = n => {
  switch (n) {
    case 0:
      return "";
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    case 9:
      return "nine";
  }
};

const parseTeens = n => {
  switch (n) {
    case 10:
      return "ten";
    case 11:
      return "eleven";
    case 12:
      return "twelve";
    case 13:
      return "thirteen";
    case 14:
      return "fourteen";
    case 15:
      return "fifteen";
    case 16:
      return "sixteen";
    case 17:
      return "seventeen";
    case 18:
      return "eighteen";
    case 19:
      return "nineteen";
  }
};

const parseTens = n => {
  switch (n) {
    case 2:
      return "twenty";
    case 3:
      return "thirty";
    case 4:
      return "forty";
    case 5:
      return "fifty";
    case 6:
      return "sixty";
    case 7:
      return "seventy";
    case 8:
      return "eighty";
    case 9:
      return "ninety";
  }
};

const max = 33;

const parseNumber = n => {
  if (n === 1000) {
    return "one thousand";
  } else if (n > 99) {
    // hundreds
    let hundreds = Math.floor(n / 100);
    let includeAnd = n % 100 === 0 ? false : true;
    return `${parseSingleDigit(Math.floor(n / 100))} hundred ${
      includeAnd ? "and " : ""
    }${parseNumber(n % 100)}`;
  } else if (n > 19) {
    // tens
    return `${parseTens(Math.floor(n / 10))} ${parseSingleDigit(n % 10)}`;
  } else if (n > 9) {
    // teens
    return parseTeens(n);
  } else {
    return parseSingleDigit(n);
  }
};

let totalChars = 0;

for (let index = 1; index <= 1000; index++) {
  let num = parseNumber(index);
  let chars = num.replace(/\s/g, "").length;

  totalChars += chars;

   // console.log(num, chars);
}

console.log("total", totalChars);
// 21124