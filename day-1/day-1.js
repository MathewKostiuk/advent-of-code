const fs = require('fs');

const readInputs = () => {
  return fs.readFileSync('./day-1', 'utf-8')
    .split('\n')
    .map(input => parseInt(input));
}

const calculateFuelRequired = (mass) => {
  const fuelNeeded = Math.floor(mass / 3) - 2;

  return fuelNeeded > 0 ? fuelNeeded + calculateFuelRequired(fuelNeeded) : 0;
}

const calculateTotalFuelRequired = () => {
  return readInputs()
    .reduce((acc, currentValue) => {
      return isNaN(currentValue) ? acc + 0 : acc + calculateFuelRequired(currentValue);
    }, 0);
}

console.log(calculateTotalFuelRequired());
