const Advent = require('../advent');

class Advent1 extends Advent {
  constructor(day) {
    super(day);
  }

  executeFirstAdvent() {
    const numbers = super.getFileLines('input.txt');
    return numbers.reduce((result, frequency) => {
      const value = parseInt(frequency.substr(1));
      if (frequency.startsWith('+')) {
        return (result += value);
      }
      return (result -= value);
    }, 0);
  }

  executeSecondAdvent() {
    const lines = super.getFileLines('input.txt');
    let seenFrequencies = { 0: true };
    let currentFrequency = 0;
    for (let i = 0; i < lines.length; ++i) {
      const value = lines[i].startsWith('-')
        ? parseInt(lines[i].substr(1)) * -1
        : parseInt(lines[i].substr(1));
      currentFrequency += value;
      if (seenFrequencies[currentFrequency]) {
        return currentFrequency;
      }
      seenFrequencies[currentFrequency] = true;
      if (i === lines.length - 1) {
        i = -1;
      }
    }
  }
}

module.exports = Advent1;
