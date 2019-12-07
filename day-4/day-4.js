const input = [206938, 679128];

const isValid = (password) => {
  let twoAdjacent = false;
  let onlyIncreasing = true;

  for (let i = 0; i < password.length; i++) {
    if (password[i] === password[i + 1]) {
      twoAdjacent = true;
    }

    if (Number(password[i]) > Number(password[i + 1])) {
      onlyIncreasing = false;
    }
  }
  return twoAdjacent && onlyIncreasing;
};

const createPossiblePasswords = (input) => {

  let possibleCombinations = 0;
  for (let i = input[0]; i <= input[1]; i++) {
    if (isValid(i + '')) {
      possibleCombinations++;
    }
  }
  return possibleCombinations;
}

console.log(createPossiblePasswords(input));
