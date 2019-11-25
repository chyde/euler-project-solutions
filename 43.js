// Generates a number where the value d is unique to the string
// and (d)(s0)(s1) (ex: 413) is divisible by the prime param.
// Note: 0 is valid.
let generate = (prime, seed) => {
  let dSeeds = [];
  for (let d = 0; d < 10; d++) {
    if (seed.indexOf(d.toString()) > -1) continue;

    let dSeed = `${d}${seed.substring(0, 2)}`;
    if (parseInt(dSeed) % prime === 0) {
      dSeeds.push(`${d}${seed}`);
    }
  }

  return dSeeds;
};

// Some setup to run the generator over some primes
const primes = [13, 11, 7, 5, 3, 2, 1];
n = 17;
dSeeds = [];

// setting up initial values that are multiples of 17
while (n < 1000) {
  // 119 is unique since 1 is not a unique value. discard it
  if (n !== 119 && n != 323) {
    dSeeds.push((1000 + n).toString().substring(1));
  }
  n += 17;
}

// For each prime, generate another d value to each seed. discard invalid ones
for (let primeIndex = 0; primeIndex < primes.length; primeIndex++) {
  for (let seedIndex = dSeeds.length - 1; seedIndex >= 0; seedIndex--) {
    const seed = dSeeds.splice(seedIndex, 1)[0];
    dSeeds = dSeeds.concat(generate(primes[primeIndex], seed));
  }
}

// sum up vals
let sum = 0;
for (let dSeedIndex = 0; dSeedIndex < dSeeds.length; dSeedIndex++) {
  sum += parseInt(dSeeds[dSeedIndex]);
}

console.log(dSeeds);
console.log(sum); // S
