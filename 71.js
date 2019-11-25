const threeSevenths = 3 / 7;
const maxD = 1000000;

let closest = { value: 0 };

for (let dIndex = 2; dIndex <= maxD; dIndex++) {
  let n = Math.floor(dIndex * threeSevenths);
  let value = n / dIndex;

  if (n % 3 === 0 && dIndex % 7 === 0) continue;

  if (value > closest.value) {
    closest = { n: n, d: dIndex, value: value };
    // console.log(`${closest.n}/${closest.d}`);
  }
}

console.log("CLOSEST", closest);
