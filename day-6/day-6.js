const fs = require('fs');

const readInputs = () => {
  return fs.readFileSync('./day-6', 'utf-8')
    .split('\n')
    .reduce((orbits, line) => {
      const [object1, object2] = line.trim().split(')');
      if (object2 !== undefined) {
        orbits[object2] = object1;
      }
      return orbits;
    }, {});
}

const countOrbits = () => {
  const orbitObject = readInputs();

  let counter = 0;

  const planetsOrbitingAnother = Object.keys(orbitObject);

  for (let i = 0; i < planetsOrbitingAnother.length; i++) {
    const currentPlanet = planetsOrbitingAnother[i];
    let nextPlanet = orbitObject[currentPlanet];

    while (nextPlanet) {
      nextPlanet = orbitObject[nextPlanet]
      counter++;
    }
  }
  return counter;
}


console.log(countOrbits());
