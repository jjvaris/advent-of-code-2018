const Advent = require("../advent");

class Advent2 extends Advent {
  constructor(day) {
    super(day);
  }

  executeFirstAdvent() {
    const numbers = super.getFileLines("input.txt");
  }

  executeSecondAdvent() {
    const lines = super.getFileLines("input.txt");
  }
}

module.exports = Advent2;
