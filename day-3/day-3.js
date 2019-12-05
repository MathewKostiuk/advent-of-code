const fs = require('fs');

const readInputs = () => {
  const [lineOne, lineTwo] = fs.readFileSync('./day-3', 'utf-8')
    .split('\n')
  return [lineOne.split(','), lineTwo.split(',')];
}

const drawLines = (coords) => {
  let lastCoordinate = [0, 0];

  const result = coords.map((coordinate) => {

    const value = parseInt(coordinate.substr(1));
    switch(coordinate[0]) {
      case 'U':
        lastCoordinate = [lastCoordinate[0], lastCoordinate[1] + value];
        return lastCoordinate;

      case 'D':
        lastCoordinate = [lastCoordinate[0], lastCoordinate[1] - value];
        return lastCoordinate;

      case 'L':
        lastCoordinate = [lastCoordinate[0] - value, lastCoordinate[1]];
        return lastCoordinate;

      case 'R':
        lastCoordinate = [lastCoordinate[0] + value, lastCoordinate[1]];
        return lastCoordinate;
    }
  })
  result.unshift([0, 0]);
  return result;
}

const findIntersectionPoints = (lineOne, lineTwo) => {
  const coordsOne = drawLines(lineOne);
  const coordsTwo = drawLines(lineTwo);
  let intersectionCoords = [];

  for (let i = 0; i < coordsOne.length - 1; i++) {
    let pointOne = coordsOne[i];
    let pointTwo = coordsOne[i + 1];
    const isHorizontal = pointOne[0] !== pointTwo[0] ? true : false;

    for (let j = 0; j < coordsTwo.length - 1; j++) {
      let jPointOne = coordsTwo[j];
      let jPointTwo = coordsTwo[j + 1];
      const jIsHorizontal = jPointOne[0] !== jPointTwo[0] ? true : false;

      if (isHorizontal && jIsHorizontal) continue;
      if (!isHorizontal && !jIsHorizontal) continue;

      let pointOneX = pointOne[0];
      let pointOneY = pointOne[1];

      let pointTwoX = pointTwo[0];
      let pointTwoY = pointTwo[1];

      let jPointOneX = jPointOne[0];
      let jPointOneY = jPointOne[1];

      let jPointTwoX = jPointTwo[0];
      let jPointTwoY = jPointTwo[1];

      if (isHorizontal) {
        // if the baseline is isHorizontal, that means that only the x coordinates of
        // the baseline are changing. Inversely, that also means that the compare lines y coordinates are changing
        if (pointOneY < jPointOneY && pointOneY > jPointTwoY) {
          if (jPointOneX > pointOneX && jPointOneX < pointTwoX) {
            intersectionCoords.push(Math.abs(jPointOneX) + pointOneY);
            continue;
          }
          if (jPointOneX < pointOneX && jPointOneX > pointTwoX) {
            intersectionCoords.push(Math.abs(jPointOneX) + pointOneY);
            continue;
          }
        }
        if (pointOneY > jPointOneY && pointOneY < jPointTwoY) {
          if (jPointOneX > pointOneX && jPointOneX < pointTwoX) {
            intersectionCoords.push(Math.abs(jPointOneX) + pointOneY);
          }
          if (jPointOneX < pointOneX && jPointOneX > pointTwoX) {
            intersectionCoords.push(Math.abs(jPointOneX) + pointOneY);
          }
        }

        // here, an intersection occurs when the compare lines y coordinates pass through the baselines x coordinates


        // if the baseline is vertical, that means that only the y coordinates of the baseline are changing. Inversely, that also means that the compare lines x coordinates are changing.

        // here, an intersection occurs when the compare lines x coordinates pass through the baselines y coordinates
      } else {
        if (pointOneX > jPointOneX && pointOneX < jPointTwoX) {
          if (jPointOneY < pointOneY && jPointOneY > pointTwoY) {
            intersectionCoords.push(Math.abs(pointOneX) + Math.abs(jPointOneY));
            continue;
          }
          if (jPointOneY > pointOneY && jPointOneY < pointTwoY) {
            intersectionCoords.push(Math.abs(pointOneX) + Math.abs(jPointOneY));
            continue;
          }
        }

        if (pointOneX < jPointOneX && pointOneX > jPointTwoX) {
          if (jPointOneY < pointOneY && jPointOneY > pointTwoY) {
            intersectionCoords.push(Math.abs(pointOneX) + Math.abs(jPointOneY));
            continue;
          }
          if (jPointOneY > pointOneY && jPointOneY < pointTwoY) {
            intersectionCoords.push(Math.abs(pointOneX) + Math.abs(jPointOneY));
            continue;
          }
        }
      }
    }
  }
  return Math.min(...intersectionCoords);
}
const [lineOne, lineTwo] = readInputs();

const result = findIntersectionPoints(lineOne, lineTwo);

console.log(result);
