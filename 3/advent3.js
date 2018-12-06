const Advent = require('../advent');

class Advent2 extends Advent {
  constructor(day) {
    super(day);
  }

  executeFirstAdvent() {
    const lines = super.getFileLines('input.txt');
    const fabric = {};
    lines.forEach(line => {
      const [xy, size] = line.split('@ ')[1].split(': ');
      const [x, y] = xy.split(',').map(number => parseInt(number));
      const [w, h] = size.split('x').map(number => parseInt(number));
      for (let i = y; i < y + h; i++) {
        for (let j = x; j < x + w; j++) {
          const key = `${j} ${i}`;
          if (!fabric[key]) fabric[key] = 0;
          fabric[key]++;
        }
      }
    });
    return Object.entries(fabric).filter(([k, v]) => v > 1).length;
  }

  executeSecondAdvent() {
    //const lines = super.getFileLines('input2.txt');
  }
}

module.exports = Advent2;
