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
        if (!letters[letter]) letters[letter] = 0;
        letters[letter]++;
      }
      if (Object.entries(letters).find(([letter, count]) => count === 2))
        twos++;
      if (Object.entries(letters).find(([letter, count]) => count === 3))
        threes++;
    }
    return twos * threes;
  }

  executeSecondAdvent() {
    const lines = super.getFileLines('input2.txt');
    for (const x of lines) {
      for (const y of lines) {
        let differences = 0;
        for (const i in x) {
          if (x[i] !== y[i]) differences++;
        }
        if (differences === 1) {
          let answer = '';
          for (const i in x) {
            if (x[i] === y[i]) answer += x[i];
          }
          return answer;
        }
      }
    }
  }
}

module.exports = Advent2;
