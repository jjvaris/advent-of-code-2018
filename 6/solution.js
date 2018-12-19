const Advent = require('../advent');

class Solution extends Advent {
  constructor(day) {
    super(day);
    const input = super.getFileLines('input.txt');
    this.coordinates = input.map(line =>
      line.split(', ').map(i => parseInt(i))
    );
    this.minAndMax = this.getMinAndMaxCoordinates(this.coordinates);
  }

  executeFirstAdvent() {
    const { minX, minY, maxX, maxY } = this.minAndMax;
    const nodes = {};
    const inf = [];
    const counts = {};
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let x = minX - 1; x <= maxX + 1; x++) {
        let node = this.getClosest(x, y);
        if (node) {
          if (x === minX || x === maxX || y === minY || y === maxY) {
            inf.push(node);
          }
          nodes[[x, y]] = node;
          if (!counts[node]) counts[node] = 0;
          counts[node]++;
        }
      }
    }

    return Object.entries(counts)
      .filter(([k, v]) => !inf.includes(k))
      .reduce((max, [k, v]) => (v > max ? v : max), 0);
  }

  executeSecondAdvent() {
    const { minX, minY, maxX, maxY } = this.minAndMax;
    let count = 0;
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        let sum = this.getSum(x, y);
        if (sum < 10000) {
          count++;
        }
      }
    }

    return count;
  }

  getMinAndMaxCoordinates(coordinates) {
    return coordinates.reduce(
      (minMax, coordinate) => {
        const [x, y] = coordinate;
        if (x < minMax.minX) minMax.minX = x;
        if (x > minMax.maxX) minMax.maxX = x;
        if (y < minMax.minY) minMax.minY = y;
        if (y > minMax.maxY) minMax.maxY = y;
        return minMax;
      },
      {
        minX: Number.MAX_VALUE,
        minY: Number.MAX_VALUE,
        maxX: Number.MIN_VALUE,
        maxY: Number.MIN_VALUE,
      }
    );
  }

  getClosest(x, y) {
    let minDist = Number.MAX_VALUE;
    let node = undefined;
    for (const [cx, cy] of this.coordinates) {
      const mdist = Math.abs(x - cx) + Math.abs(y - cy);
      if (mdist <= minDist) {
        if (minDist === mdist) {
          node = undefined;
        } else {
          node = `${cx},${cy}`;
        }
        minDist = mdist;
      }
    }
    return node;
  }
  getSum(x, y) {
    let sum = 0;
    for (const [cx, cy] of this.coordinates) {
      sum += Math.abs(x - cx) + Math.abs(y - cy);
    }
    return sum;
  }
}

module.exports = Solution;
