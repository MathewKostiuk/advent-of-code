const Intcode = require('../day-5/day-5.js').Intcode;


const amplicationCircuit = () => {
  const allCombinations = arrayCreate([0,1,2,3,4], 5);
  const allCombinationsPartTwo = arrayCreate([5, 6, 7, 8, 9], 5);
  const results = [];
  for (let i = 0; i < allCombinationsPartTwo.length; i++) {
    const phaseSettings = allCombinationsPartTwo[i];
    results.push(feedbackLoop(phaseSettings));
  }
  return Math.max(...results);
}

const feedbackLoop = (phaseSettings) => {
  let startingValue = 0;
  let isRunning = true;
  const outputArray = [];
  const intcoders = initializeIntcoder(phaseSettings);
  let lastRun = intcoders;

  while (isRunning) {
    const loop = lastRun.map((intcoder) => {
      const output = intcoder.runProgram(startingValue);
      startingValue = output;
      isRunning = intcoder.isRunning;
      outputArray.push(output);
      return intcoder;
    })
    lastRun = loop;
  }
  return Math.max(...outputArray);
}

const initializeIntcoder = (phaseSettings) => {
  return phaseSettings.map((phaseSetting) => {
    return new Intcode(phaseSetting);
  });
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
