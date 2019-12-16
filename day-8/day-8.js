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

  for (let i = 0; i < inputs.length; i += layerSize) {
    const layer = [];
    let indexCounter = i;
    let layerCounter = i + width;

    let zeroes = 0;
    let ones = 0;
    let twos = 0;
    while (layer.length < 6) {
      const substring = inputs.substring(indexCounter, layerCounter);
      layer.push(substring);
      zeroes += countDigits(0, substring);
      ones += countDigits(1, substring);
      twos += countDigits(2, substring);
      layerCounter += width;
      indexCounter += width;
    }
    image.push(layer);
    result.push([zeroes, ones * twos]);
  }
  return result.sort((a, b) => {
    return a[0] - b[0];
  });
}

const partOne = () => {
  const inputs = readInputs();
  const result = createImage(inputs, 25, 6);
  return result[0][1];
}

console.log(partOne());
