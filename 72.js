// 72

const dMax = 8;
const totalFractions = dMax ** 2;
let reducableFractionsCount = 0;

// 3/4 3/5 3/6 3/7 3/8
// 4/5 4/6 4/7 4/8

function getDivisors(n){

  var numDivisors = 1;
  var factor = 2; // Candidate for prime factor of `n`

  // If `n` is not a prime number then it must have one factor
  // which is <= `sqrt(n)`, so we try these first:
  while (factor * factor <= n) {
      if (n % factor === 0) {
          // `factor` is a prime factor of `n`, determine the exponent:
          var exponent = 0;
          do {
              n /= factor;
              exponent++;
          } while (n % factor === 0)
          // `factor^exponent` is one term in the prime factorization of n,
          // this contributes as factor `exponent + 1`:
          numDivisors *= exponent + 1;
      }
      // Next possible prime factor:
      factor = factor == 2 ? 3 : factor + 2
  }

  // Now `n` is either 1 or a prime number. In the latter case,
  // it contributes a factor 2:
  if (n > 1) {
      numDivisors *= 2;
  }

  return numDivisors;
}

let divisorsCount = 0;
for (let index = 1; index <= 8; index++) {
  divisorsCount += getDivisors(index);
  
}
console.log(divisorsCount);