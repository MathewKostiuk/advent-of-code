const fs = require('fs');

const readInputs = () => {
  return fs.readFileSync(`./day-8`, 'utf-8').trim().toString();
}

const countDigits = (digit, substring) => {
  const regex = new RegExp(digit, 'g');
  return (substring.match(regex) || []).length;
}

const createImage = (inputs, width, height) => {
  const layerSize = width * height;
  const image = [];
  const result = [];
  const indicesOfTwo = [];
  let cloneOfFirstLayer;

  for (let i = 0; i < inputs.length; i += layerSize) {
    const layer = [];
    let indexCounter = i;
    let layerCounter = i + layerSize;
    let zeroes = 0;
    let ones = 0;
    let twos = 0;

    const substring = inputs.substring(indexCounter, layerCounter);
    if (i === 0) {
      cloneOfFirstLayer = substring.split('');
    }
    layer.push(substring);

    for (let j = 0; j < substring.length; j++) {
      if (substring[j] === '2' && i === 0) {
        indicesOfTwo.push(j);
      }
      if (i !== 0) {
        if (substring[j] !== '2' && cloneOfFirstLayer[j] === '2') {
          cloneOfFirstLayer[j] = substring[j];
        }
      }

    }

    zeroes += countDigits(0, substring);
    ones += countDigits(1, substring);
    twos += countDigits(2, substring);

    image.push(layer);
    result.push([zeroes, ones * twos]);
  }
  const newImage = [];
  for (let k = 0; k < cloneOfFirstLayer.length; k += width) {
    newImage.push(cloneOfFirstLayer.slice(k, k + width));
  }

  const partOneSolution = result.sort((a, b) => {
    return a[0] - b[0];
  });
  const imageResult = newImage.map((row) => row.map((c) => c === '0' ? ' ' : 'X').join('')).join('\n');

  return [partOneSolution, imageResult];
}

const solutions = () => {
  const inputs = readInputs();
  const [partOneSolution, imageResult] = createImage(inputs, 25, 6);
  return `this is part one: ${partOneSolution[0][1]}  and this is part 2: \n ${imageResult}`;
}

console.log(solutions());
