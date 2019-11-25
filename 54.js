// High Card: Highest value card.
// One Pair: Two cards of the same value.
// Two Pairs: Two different pairs.
// Three of a Kind: Three cards of the same value.
// Straight: All cards are consecutive values.
// Flush: All cards of the same suit.
// Full House: Three of a kind and a pair.
// Four of a Kind: Four cards of the same value.
// Straight Flush: All cards are consecutive values of same suit.
// Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.

// p054_poker.txt
var fs = require("fs");

const readCard = cardCode => {
  let card = { suit: cardCode[1], value: null };

  if (parseInt(cardCode[0])) {
    card.value = parseInt(cardCode[0]);
  } else {
    switch (cardCode[0]) {
      case "T":
        card.value = 10;
        break;
      case "J":
        card.value = 11;
        break;
      case "Q":
        card.value = 12;
        break;
      case "K":
        card.value = 13;
        break;
      case "A":
        card.value = 14;
        break;
    }
  }
  return card;
};

const sortHand = hand => {
  return hand.sort((c1, c2) => {
    return c2.value - c1.value;
  });
};

const checkPairsThreesFours = hand => {
  const results = { pairs: [], three: null, four: null, isFullHouse: false };

  // NOTE: we don't look at the last card
  for (let cardIndex = 0; cardIndex < hand.length - 1; cardIndex++) {
    // Check if this is already part of a set ( we only count unique sets)
    if (cardIndex != 0 && hand[cardIndex - 1].value === hand[cardIndex].value) {
      continue;
    }
    if (hand[cardIndex].value === hand[cardIndex + 1].value) {
      if (
        cardIndex + 2 < hand.length &&
        hand[cardIndex].value === hand[cardIndex + 2].value
      ) {
        if (
          cardIndex + 3 < hand.length &&
          hand[cardIndex].value === hand[cardIndex + 3].value
        ) {
          results.four = hand[cardIndex].value;
        } else {
          results.three = hand[cardIndex].value;
        }
      } else {
        results.pairs.push(hand[cardIndex].value); // its an array bc there can be 2 values
      }
    }
  }

  return results;
};

const isFlush = hand => {
  for (let cardIndex = 1; cardIndex < hand.length; cardIndex++) {
    if (hand[0].suit !== hand[cardIndex].suit) {
      return false;
    }
  }
  return true;
};

const isStraight = hand => {
  for (let cardIndex = 0; cardIndex < hand.length; cardIndex++) {
    if (hand[0].value + cardIndex !== hand[cardIndex].value) {
      return false;
    }
  }
  return true;
};

const evalHand = hand => {
  const evaluation = checkPairsThreesFours(hand);

  evaluation.hand = hand;

  if (evaluation.pairs.length === 1 && evaluation.three !== null) {
    evaluation.isFullHouse = true;
  }

  evaluation.isStraight = isStraight(hand);
  evaluation.isFlush = isFlush(hand);
  evaluation.isStraightFlush = evaluation.isStraight && evaluation.isFlush ? true : false;

  return evaluation;
};

const listifyEvaluation = evaluation => {
  let evaluationList = [];

  if (evaluation.isStraightFlush) {
    console.log("WTF", evaluation.hand);
    evaluationList.push(1); //evaluation.hand[0].value
  } else {
    evaluationList.push(0);
  }
  evaluationList.push(evaluation.four ? evaluation.four : 0);
  if (evaluation.isFullHouse) {
    evaluationList.push(evaluation.three);
  } else {
    evaluationList.push(0);
  }
  evaluationList.push(evaluation.isFlush ? 1 : 0);
  evaluationList.push(evaluation.isStraight ? evaluation.hand[0].value : 0);
  evaluationList.push(evaluation.three ? evaluation.three : 0);
  evaluationList.push(evaluation.pairs.length === 2 ? evaluation.pairs[0] : 0);
  evaluationList.push(evaluation.pairs.length === 2 ? evaluation.pairs[1] : 0);
  evaluationList.push(evaluation.pairs.length === 1 ? evaluation.pairs[0] : 0);
  // evaluationList.push(evaluation.hand[0].value);

  return evaluationList;
};

const compareEvaluations = (eval1, eval2, hand1, hand2) => {
  for (let evalIndex = 0; evalIndex < eval1.length; evalIndex++) {
    if (eval1[evalIndex] > eval2[evalIndex]) return "P1";
    if (eval1[evalIndex] < eval2[evalIndex]) return "P2";
  }

  for (let cardIndex = 0; cardIndex < eval1.length; cardIndex++) {
    if (hand1[cardIndex].value > hand2[cardIndex].value ) return "P1";
    if (hand1[cardIndex].value  < hand2[cardIndex].value ) return "P2";
  }
};

const playGame = gameLine => {
  let unparsedCards = gameLine.split(" ");

  if (unparsedCards.length !== 10) return "No Contest";
  let p1 = unparsedCards.splice(0, 5, 6);
  let p2 = unparsedCards.splice(1, 5, 6);

  p1 = p1.map(readCard);
  p2 = p2.map(readCard);

  sortHand(p1);
  sortHand(p2);

  const p1Evaluation = evalHand(p1);
  const p2Evaluation = evalHand(p2);

  const p1EvalList = listifyEvaluation(p1Evaluation);
  const p2EvalList = listifyEvaluation(p2Evaluation);

  const result = compareEvaluations(p1EvalList, p2EvalList, p1Evaluation.hand, p2Evaluation.hand);
  // console.log(result, "WINS!");

  console.log("GAME\n---------");
  console.log(p1Evaluation);
  console.log(p2Evaluation);
  console.log(p1EvalList);
  console.log(p2EvalList);

  return result;
};

// HERE IS THE GAME PLAY
// RUN
let fileContents = fs.readFileSync(
  "/Users/chyde2/Documents/playground/euler/p054_poker.txt",
  "utf8"
);

let games = fileContents.split("\n");
// let games = 
// `5H 5C 6S 7S KD 2C 3S 8S 8D TD
// 5D 8C 9S JS AC 2C 5C 7D 8S QH
// 2D 9C AS AH AC 3D 6D 7D TD QD
// 4D 6S 9H QH QC 3D 6D 7H QD QS
// 2H 2D 4C 4D 4S 3C 3D 3S 9S 9D
// `.split("\n");

let p1Wins = 0;
let p2Wins = 0;
let noContest = 0;
for (let gameIndex = 0; gameIndex < games.length; gameIndex++) {
  let winner = playGame(games[gameIndex]);
  console.log(`Winner ${gameIndex + 1}:`, winner, "\n\n");

  // COunt our stuff
  if (winner === "P1") p1Wins++;
  else if (winner === "P2") p2Wins++;
  else noContest++;
}

console.log("P1:", p1Wins);
console.log("P2:", p2Wins);
console.log("No Contest:", noContest);

// let testGame = games[18];
// playGame(testGame);
