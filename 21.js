const factorial = n => {
  if (n > 1n) {
    return n * factorial(n - 1n);
  }
  return n;
};

const factorial100 = factorial(100n).toString();
console.log(factorial100, factorial100.length);
let sum = 0;

for (let i = 0; i < factorial100.length; i++) {
  sum += parseInt(factorial100[i]);
}

console.log(sum);
