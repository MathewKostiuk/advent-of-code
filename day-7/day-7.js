const Intcode = require('../day-5/day-5.js').Intcode;


const amplicationCircuit = () => {
  const allCombinations = arrayCreate([5,6,7,8,9], 5);
  const results = [];
  for (let i = 0; i < allCombinations.length; i++) {
    console.log(allCombinations[i]);
    const intCodeA = new Intcode(allCombinations[i][0], 0, 7);
    const outputA = intCodeA.runProgram();
    const intCodeB = new Intcode(allCombinations[i][1], outputA, 7);
    const outputB = intCodeB.runProgram();
    const intCodeC = new Intcode(allCombinations[i][2], outputB, 7);
    const outputC = intCodeC.runProgram();
    const intCodeD = new Intcode(allCombinations[i][3], outputC, 7);
    const outputD = intCodeD.runProgram();
    const intCodeE = new Intcode(allCombinations[i][4], outputD, 7);
    const outputE = intCodeE.runProgram();
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
