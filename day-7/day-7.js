const Intcode = require('../day-5/day-5.js').Intcode;


const amplicationCircuit = () => {
  const allCombinations = arrayCreate([0,1,2,3,4], 5);
  const results = [];
  for (let i = 0; i < allCombinations.length; i++) {
    console.log(allCombinations[i]);
    const intCodeA = new Intcode(allCombinations[i][0]);
    const outputA = intCodeA.runProgram(0);
    const intCodeB = new Intcode(allCombinations[i][1]);
    const outputB = intCodeB.runProgram(outputA);
    const intCodeC = new Intcode(allCombinations[i][2]);
    const outputC = intCodeC.runProgram(outputB);
    const intCodeD = new Intcode(allCombinations[i][3]);
    const outputD = intCodeD.runProgram(outputC);
    const intCodeE = new Intcode(allCombinations[i][4]);
    const outputE = intCodeE.runProgram(outputD);
    results.push(outputE);
  }
  return Math.max(...results);
}

const arrayCreate = (array, size) => {

  function iter(parts) {
    return function (v) {
      var temp = parts.concat(v);
      if (parts.includes(v)) {
        return;
      }
      if (temp.length === size) {
        result.push(temp);
        return;
      }
      array.forEach(iter(temp));
    }
  }

  var result = [];
  array.forEach(iter([]));
  return result;
}


console.log(amplicationCircuit());
