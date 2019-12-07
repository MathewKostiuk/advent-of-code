const input = [206938, 679128];

const isValid = (password) => {
  let twoAdjacent = false;
  let onlyIncreasing = true;
  let adjacents = {};

  for (let i = 0; i < password.length; i++) {
    if (password[i] === password[i + 1]) {
      twoAdjacent = true;
      if (adjacents.hasOwnProperty(password[i])) {
        adjacents[password[i]]++;
      } else {
        adjacents[password[i]] = 1;
      }
    }

    if (Number(password[i]) > Number(password[i + 1])) {
      onlyIncreasing = false;
    }
  }
  if (Object.values(adjacents).indexOf(2) !== -1 && Object.values(adjacents).indexOf(1) === -1) {
    twoAdjacent = false;
  }
  if (Math.max(Object.values(adjacents)) > 1 && Object.values(adjacents).indexOf(1) === -1) {
    twoAdjacent = false;
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

const countAdjacents = (password) => {

}

console.log(createPossiblePasswords(input));
