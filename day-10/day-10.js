const fs = require('fs');

const readInputs = () => {
  return fs.readFileSync('./day-10', 'utf-8')
  .split('\n');
}

const mapAsteroids = (map) => {
  return map.reduce((objects, line, y) => {
    line.trim().split('').forEach((space, x) => {
      if (space === '#') {
        objects.push({ x, y });
      }
    });
    return objects;
  }, []);
}

const count = (mappedAsteroids) => {
  return asteroidAngles = mappedAsteroids.map(({x: x1, y: y1}) => {
    const angles = new Set();

    mappedAsteroids.forEach(({x: x2, y: y2}) => {
      if (!(x1 === x2 && y1 === y2)) {
        angles.add(Math.atan2(y2 - y1, x2 - x1));
      }
    });

    return {
      asteroids: angles.size,
      x: x1,
      y: y1
    };
  });
}

const partOne = () => {
  const map = readInputs();
  const mappedAsteroids = mapAsteroids(map);
  const totals = count(mappedAsteroids);
  return totals.sort((a, b) => b.asteroids - a.asteroids)[0]
}

console.log(partOne());
