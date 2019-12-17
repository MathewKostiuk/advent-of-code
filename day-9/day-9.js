const fs = require('fs');

class Intcode {
  constructor(phaseSetting) {
    this.phaseSetting = [phaseSetting];
    this.instructionPointer = 0;
    this.relativeBase = 0;
    this.inputs = this.readInputs();
    this.isRunning = true;

    this.addExtraInputs();
  }

  addExtraInputs() {
    const beginningLength = this.inputs.length * 10000;
    for (let i = 0; i < beginningLength; i++) {
      this.inputs.push(0);
    }
  }

  readInputs() {
    return fs.readFileSync(`./day-9`, 'utf-8')
      .split(',')
      .map(input => parseInt(input));
  }


  addTrailingZeros(opcode) {
    for (let i = opcode.length; i < 5; i++) {
      opcode = '0' + opcode;
    }
    return opcode;
  }

  getParameters(instruction, i) {
    const fullInstruction = this.addTrailingZeros(instruction);
    const opcode = fullInstruction.substring(3);
    const firstMode = fullInstruction[2];
    let firstParameter;
    let firstAddress;
    const secondMode = fullInstruction[1];
    let secondParameter;
    const thirdMode = fullInstruction[0];
    const thirdParameter = thirdMode === '2' ?
      this.relativeBase + this.inputs[i + 3] :
      this.inputs[i + 3];

    const firstReducer = {
      '0': () => firstParameter = this.inputs[this.inputs[i + 1]],
      '1': () => firstParameter = this.inputs[i + 1],
      '2': () => firstParameter = this.inputs[this.inputs[i + 1] + this.relativeBase]
    };

    const secondReducer = {
      '0': () => secondParameter = this.inputs[this.inputs[i + 2]],
      '1': () => secondParameter = this.inputs[i + 2],
      '2': () => secondParameter = this.inputs[this.inputs[i + 2] + this.relativeBase]
    }

    firstReducer[firstMode]();
    secondReducer[secondMode]();

    if (opcode === '03') {
      if (firstMode === '2') {
        firstAddress = this.relativeBase + this.inputs[i + 1];
      } else {
        firstAddress = this.inputs[i + 1];
      }
      firstParameter = this.phaseSetting.shift();
    }

    return [opcode, firstParameter, secondParameter, thirdParameter, firstAddress];
  }

  write(opcode, i, firstParameter, secondParameter, thirdParameter, firstAddress) {
    const opcodeReducers = {
      '01': () => {
        this.inputs[thirdParameter] = firstParameter + secondParameter;
        return;
      },
      '02': () => {
        this.inputs[thirdParameter] = firstParameter * secondParameter;
        return;
      },
      '03': () => {
        this.inputs[firstAddress] = firstParameter;
        return;
      },
      '04': () => {
        return firstParameter;
      },
      '05': () => {
        return;
      },
      '06': () => {
        return;
      },
      '07': () => {
        this.inputs[thirdParameter] = firstParameter < secondParameter ? 1 : 0;
        return;
      },
      '08': () => {
        this.inputs[thirdParameter] = firstParameter === secondParameter ? 1 : 0;
        return;
      },
      '09': () => {
        this.relativeBase += firstParameter;
      },
      '99': () => {
        return;
      }
    }
    return opcodeReducers[opcode]();
  }

  setinstructionPointer(opcode, firstParameter, secondParameter, i) {
    const plusFour = ['01', '02', '07', '08'];
    const plusTwo = ['03', '04', '09'];

    if (plusFour.includes(opcode)) {
      return i + 4;
    }
    if (plusTwo.includes(opcode)) {
      return i + 2;
    }

    if (opcode === '05') {
      return firstParameter !== 0 ? secondParameter : i + 3;
    } else if (opcode === '06') {
      return firstParameter === 0 ? secondParameter : i + 3;
    }
  }

  runProgram(input) {
    if (input) {
      this.phaseSetting.push(input);
    }
    for (let i = this.instructionPointer; i < this.inputs.length; i = this.instructionPointer) {
      const instruction = this.inputs[i] + '';
      const [opcode, firstParameter, secondParameter, thirdParameter, firstAddress] = this.getParameters(instruction, i);
      if (opcode === '99') {
        this.isRunning = false;
        break;
      }

      const output = this.write(opcode, i, firstParameter, secondParameter, thirdParameter, firstAddress);
      this.instructionPointer = this.setinstructionPointer(opcode, firstParameter, secondParameter, i);
      if (output) {
        console.log(output);
      }
    }
    return this.inputs[0];
  }
}

const intcode = new Intcode(1);
console.log(intcode.runProgram());
