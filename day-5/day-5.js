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
  const thirdParameter = inputs[i + 3];

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
    firstParameter = 5;
  }
  return [opcode, firstParameter, secondParameter, thirdParameter];
}

const write = (opcode, inputs, i, firstParameter, secondParameter, thirdParameter) => {
  if (opcode === '01') {
    inputs[thirdParameter] = firstParameter + secondParameter;
  } else if (opcode === '02') {
    inputs[thirdParameter] = firstParameter * secondParameter;
  } else if (opcode === '03') {
    inputs[inputs[i + 1]] = firstParameter;
  } else if (opcode === '04') {
    console.log(firstParameter);
  } else if (opcode === '07') {
    if (firstParameter < secondParameter) {
      inputs[thirdParameter] = 1;
    } else {
      inputs[thirdParameter] = 0;
    }
  } else if (opcode === '08') {
    if (firstParameter === secondParameter) {
      inputs[thirdParameter] = 1;
    } else {
      inputs[thirdParameter] = 0;
    }
  } else if (opcode === '99') {
    return;
  }
}

const setinstructionPointer = (opcode, firstParameter, secondParameter, i) => {
  if (opcode === '01' || opcode === '02' || opcode === '07' || opcode === '08') {
    return i + 4;
  } else if (opcode === '03' || opcode === '04') {
    return i + 2;
  } else if (opcode === '05') {
    return firstParameter !== 0 ? secondParameter : i + 3;
  } else if (opcode === '06') {
    return firstParameter === 0 ? secondParameter : i + 3;
  }
}

const runProgram = () => {
  let inputs = readInputs();
  for (let i = 0; i < inputs.length; i = instructionPointer) {
    const instruction = inputs[i] + '';
    const [opcode, firstParameter, secondParameter, thirdParameter] = getParameters(instruction, inputs, i);

    write(opcode, inputs, i, firstParameter, secondParameter, thirdParameter);
    instructionPointer = setinstructionPointer(opcode, firstParameter, secondParameter, i);

    if (opcode ==='99') {
      break;
    }
  }
  return inputs[0];
}

runProgram();


