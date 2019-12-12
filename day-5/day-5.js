const fs = require('fs');

class Intcode {
  constructor(phaseSetting) {
    this.phaseSetting = [phaseSetting];
    this.instructionPointer = 0;
    this.inputs = this.readInputs();
  }

  readInputs() {
    return fs.readFileSync(`./day-7`, 'utf-8')
      .split(',')
      .map(input => parseInt(input));
  }


  addTrailingZeros(opcode){
    for (let i = opcode.length; i < 5; i++) {
      opcode = '0' + opcode;
    }
    return opcode;
  }

  getParameters(instruction, inputs, i){
    const fullInstruction = this.addTrailingZeros(instruction);
    const opcode = fullInstruction.substring(3);
    const firstMode = fullInstruction[2];
    let firstParameter;
    const secondMode = fullInstruction[1];
    let secondParameter;
    const thirdParameter = this.inputs[i + 3];

    if (firstMode === '0') {
      firstParameter = this.inputs[this.inputs[i + 1]];
    } else if (firstMode === '1') {
      firstParameter = this.inputs[i + 1];
    }

    if (secondMode === '0') {
      secondParameter = this.inputs[this.inputs[i + 2]];
    } else if (secondMode === '1') {
      secondParameter = this.inputs[i + 2];
    }

    if (opcode === '03') {
      firstParameter = this.phaseSetting.shift();
    }
    return [opcode, firstParameter, secondParameter, thirdParameter];
  }

  write(opcode, inputs, i, firstParameter, secondParameter, thirdParameter){
    if (opcode === '01') {
      this.inputs[thirdParameter] = firstParameter + secondParameter;
    } else if (opcode === '02') {
      this.inputs[thirdParameter] = firstParameter * secondParameter;
    } else if (opcode === '03') {
      this.inputs[this.inputs[i + 1]] = firstParameter;
    } else if (opcode === '04') {
      return firstParameter;
    } else if (opcode === '07') {
      if (firstParameter < secondParameter) {
        this.inputs[thirdParameter] = 1;
      } else {
        this.inputs[thirdParameter] = 0;
      }
    } else if (opcode === '08') {
      if (firstParameter === secondParameter) {
        this.inputs[thirdParameter] = 1;
      } else {
        this.inputs[thirdParameter] = 0;
      }
    } else if (opcode === '99') {
      return;
    }
  }

  setinstructionPointer(opcode, firstParameter, secondParameter, i){
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

  runProgram(input){

    this.phaseSetting.push(input);

    for (let i = 0; i < this.inputs.length; i = this.instructionPointer) {
      const instruction = this.inputs[i] + '';
      const [opcode, firstParameter, secondParameter, thirdParameter] = this.getParameters(instruction, this.inputs, i);

      const output = this.write(opcode, this.inputs, i, firstParameter, secondParameter, thirdParameter);
      this.instructionPointer = this.setinstructionPointer(opcode, firstParameter, secondParameter, i);
      if (output) {
        return output;
      }
      if (opcode === '99') {
        break;
      }
    }
    return this.inputs[0];
  }
}

module.exports.Intcode = Intcode;
// const firstIntcoder = new Intcode(1);
// const secondIntcoder = new Intcode(5);

// firstIntcoder.runProgram();
// secondIntcoder.runProgram();
