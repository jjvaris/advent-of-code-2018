const Advent = require('../advent');

class Advent3 extends Advent {
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
          const key = `${j},${i}`;
          if (!fabric[key]) fabric[key] = 0;
          fabric[key]++;
        }
      }
    });
    return Object.entries(fabric).filter(([k, v]) => v > 1).length;
  }

  executeSecondAdvent() {
    const lines = super.getFileLines('input.txt');
    const fabric = {};
    const claims = {};
    lines.forEach(line => {
      const id = line.split(' @ ')[0];
      const [xy, size] = line.split(' @ ')[1].split(': ');
      const [x, y] = xy.split(',').map(number => parseInt(number));
      const [w, h] = size.split('x').map(number => parseInt(number));
      for (let i = y; i < y + h; i++) {
        for (let j = x; j < x + w; j++) {
          const key = `${j},${i}`;
          if (!fabric[key]) fabric[key] = { count: 0, ids: [] };
          if (!claims[id]) claims[id] = 1;
          fabric[key].count++;
          fabric[key].ids.push(id);
          if (fabric[key].count > 1) {
            fabric[key].ids.forEach(id => {
              claims[id]++;
            });
          }
        }
      }
    });
    return Object.entries(claims).find(([k, v]) => v === 1)[0];
  }
}

module.exports = Advent3;
