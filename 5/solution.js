const Advent = require('../advent');

class Solution extends Advent {
  constructor(day) {
    super(day);
  }

  executeFirstAdvent() {
    const input = super.getFileLines('input.txt')[0];
    return clean(input).length;
  }

  executeSecondAdvent() {
    const input = super.getFileLines('input.txt')[0];
    let polymers = [];
    for (const c of input) {
      if (!polymers.includes(c)) {
        polymers.push(c);
      }
    }
    let min = Number.MAX_VALUE;
    for (const polymer of polymers) {
      let cleanedInput = removeChar(input, polymer);
      if (/[a-z]/.test(polymer)) {
        cleanedInput = removeChar(cleanedInput, polymer.toUpperCase());
      } else {
        cleanedInput = removeChar(cleanedInput, polymer.toLowerCase());
      }
      const length = clean(cleanedInput).length;
      if (length < min) {
        min = length;
      }
    }
    return min;
  }
}

const clean = input => {
  let cleanedInput = input;
  for (let i = 0; i < cleanedInput.length; i++) {
    if (/[a-z]/.test(cleanedInput[i])) {
      if (cleanedInput[i].toUpperCase() === input[i + 1]) {
        cleanedInput = replaceWithWhitespace(cleanedInput, i);
      }
    } else if (/[A-Z]/.test(cleanedInput[i])) {
      if (cleanedInput[i].toLowerCase() === cleanedInput[i + 1]) {
        cleanedInput = replaceWithWhitespace(cleanedInput, i);
      }
    }
  }
  cleanedInput = cleanedInput.split(' ').join('');
  return cleanedInput !== input ? clean(cleanedInput) : input;
};

const replaceWithWhitespace = (final, i) => {
  return final.substr(0, i) + '  ' + final.substr(i + 2);
};

const removeChar = (input, c) => {
  return input.replace(new RegExp(`${c}`, 'g'), '');
};

module.exports = Solution;
