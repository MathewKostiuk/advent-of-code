const fs = require('fs');

const readInputs = () => {
  return fs.readFileSync('./day-5', 'utf-8')
    .split(',')
    .map(input => parseInt(input));
}

const addTrailingZeros = (opcode) => {
  for (let i = opcode.length; i < 5; i++) {
    opcode = '0' + opcode;
  }
  return opcode;
}

const getParameters = (instruction, inputs, i) => {
  const fullInstruction = addTrailingZeros(instruction);
  const opcode = fullInstruction.substring(3);
  const firstMode = fullInstruction[2];
  let firstParameter;
  const secondMode = fullInstruction[1];
  let secondParameter;

  if (firstMode === '0') {
    firstParameter = inputs[inputs[i + 1]];
  } else if (firstMode === '1') {
    firstParameter = inputs[i + 1];
  }

  if (secondMode === '0') {
    secondParameter = inputs[inputs[i + 2]];
  } else if (secondMode === '1') {
    secondParameter = inputs[i + 2];
  }

  if (opcode === '03') {
    firstParameter = 1;
  }
  return [opcode, firstParameter, secondParameter];
}

const write = (opcode, inputs, i, firstParameter, secondParameter) => {

  if (opcode === '01') {
    inputs[inputs[i + 3]] = firstParameter + secondParameter;
  } else if (opcode === '02') {
    inputs[inputs[i + 3]] = firstParameter * secondParameter;
  } else if (opcode === '03') {
    inputs[inputs[i + 1]] = firstParameter;
  } else if (opcode === '04') {
    console.log(firstParameter);
  } else if (opcode === '99') {
    return;
  }
}


const runProgram = () => {
  let inputs = readInputs();
  instructionSize = 4;
  for (let i = 0; i < inputs.length; i += instructionSize) {
    const instruction = inputs[i] + '';
    const [opcode, firstParameter, secondParameter] = getParameters(instruction, inputs, i);
    write(opcode, inputs, i, firstParameter, secondParameter);
    if (opcode === '01' || opcode === '02') {
      instructionSize = 4;
    } else {
      instructionSize = 2;
    }
    if (opcode ==='99') {
      break;
    }
  }
  return inputs[0];
}

runProgram();


