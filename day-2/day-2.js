const fs = require('fs');

const readInputs = () => {
  return fs.readFileSync('./day-2', 'utf-8')
  .split(',')
  .map(input => parseInt(input));
}

const runProgram = (noun = 12, verb = 2) => {
  let inputs = readInputs();

  inputs[1] = noun;
  inputs[2] = verb;

  for (let i = 0; i < inputs.length; i += 4) {
    if (inputs[i] === 1) {
      inputs[inputs[i + 3]] = inputs[inputs[i + 1]] + inputs[inputs[i + 2]];
    } else if (inputs[i] === 2) {
      inputs[inputs[i + 3]] = inputs[inputs[i + 1]] * inputs[inputs[i + 2]];
    } else if (inputs[i] === 99) {
      break;
    } else {
      continue;
    }
  }
  return inputs[0];
}

const roundTwo = () => {
  const target = 19690720;
  let noun = 0;
  while (noun <= 99) {
    let verb = 0;
    while (verb <= 99) {
      if (runProgram(noun, verb) === target) {
        return [noun, verb];
      }
      verb++
    }
    noun++;
  }
}

const result = roundTwo();
console.log(100 * result[0] + result[1]);

