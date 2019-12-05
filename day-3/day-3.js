const fs = require('fs');

const readInputs = () => {
  const [lineOne, lineTwo] = fs.readFileSync('./day-3', 'utf-8')
    .split('\n')
  return [lineOne.split(','), lineTwo.split(',')];
}

const drawLines = (coords) => {
  let coordinates = [[0, 0]];

  coords.forEach((coordinate) => {
    const value = parseInt(coordinate.substr(1));
    const lastCoordinate = coordinates[coordinates.length - 1];
      switch(coordinate[0]) {
      case 'U':
        for (let i = 1; i <= value; i++) {
          coordinates.push([lastCoordinate[0], lastCoordinate[1] + i]);
        }
        break;
      case 'D':
        for (let i = 1; i <= value; i++) {
          coordinates.push([lastCoordinate[0], lastCoordinate[1] - i]);
        }
        break;
      case 'L':
          for (let i = 1; i <= value; i++) {
            coordinates.push([lastCoordinate[0] - i, lastCoordinate[1]]);
          }
        break;
      case 'R':
        for (let i = 1; i <= value; i++) {
          coordinates.push([lastCoordinate[0] + i, lastCoordinate[1]]);
        }
        break;
    }
  })
  return coordinates;
}

const findIntersections = () => {
  const [lineOne, lineTwo] = readInputs();
  const lineOneDrawn = drawLines(lineOne);
  const lineTwoDrawn = drawLines(lineTwo);

  let matches = [];
  let indices = [];

  for (let i = 0; i < lineOneDrawn.length; i++) {
    for (let j = 0; j < lineTwoDrawn.length; j++) {
      if (lineOneDrawn[i][0] === lineTwoDrawn[j][0] && lineOneDrawn[i][1] === lineTwoDrawn[j][1]) {
        if (lineOneDrawn[i][0] !== 0 && lineOneDrawn[i][1] !== 0) {
          matches.push(Math.abs(lineOneDrawn[i][0]) + Math.abs(lineOneDrawn[i][1]));
          indices.push(i + j);
        }
      }
    }
  }
  return [Math.min(...matches), Math.min(...indices)];
}


console.log(findIntersections());
