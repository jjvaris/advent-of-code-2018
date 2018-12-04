const Advent = require('../advent');

class Advent2 extends Advent {
  constructor(day) {
    super(day);
  }

  executeFirstAdvent() {
    const lines = super.getFileLines('input.txt');
    let twos = 0;
    let threes = 0;
    for (const line of lines) {
      const letters = {};
      for (const letter of line) {
        if (letters[letter]) letters[letter] = letters[letter] + 1;
        else letters[letter] = 1;
      }
      if (Object.entries(letters).find(([letter, count]) => count === 2))
        twos++;
      if (Object.entries(letters).find(([letter, count]) => count === 3))
        threes++;
    }
    return twos * threes;
  }

  executeSecondAdvent() {
    const lines = super.getFileLines('input.txt');
  }
}

module.exports = Advent2;
