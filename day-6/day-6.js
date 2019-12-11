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

const findSharedOrbits = () => {
  const orbitObject = readInputs();
  const persons = ['YOU', 'SAN'];
  const sharedOrbits = [];

  const planetsOrbitingAnother = Object.keys(orbitObject);

  for (let i = 0; i < persons.length; i++) {
    const indexOfPerson = planetsOrbitingAnother.indexOf(persons[i]);
    const currentPlanet = planetsOrbitingAnother[indexOfPerson];
    const personsOrbits = [];
    let nextPlanet = orbitObject[currentPlanet];

    while (nextPlanet) {
      personsOrbits.push(nextPlanet);
      nextPlanet = orbitObject[nextPlanet];
    }
    sharedOrbits.push(personsOrbits);
  }
  return sharedOrbits;
}

const findStepsBetweenPlanets = () => {
  const [yourOrbits, santasOrbits] = findSharedOrbits();
  let distance = 0;
  for (let i = 0; i < yourOrbits.length; i++) {
    const currentPlanet = yourOrbits[i];
    const santasOrbitIndex = santasOrbits.indexOf(currentPlanet);
    if (santasOrbitIndex !== -1) {
      distance += i + santasOrbitIndex;
      return distance;
    }
  }
}

console.log(countOrbits(), findStepsBetweenPlanets());
