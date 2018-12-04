const fs = require('fs');

class Advent {
  constructor(day) {
    this.day = day;
  }

  getFileLines(file) {
    return fs
      .readFileSync(`./${this.day}/${file}`)
      .toString()
      .split('\r\n');
  }

  logStart(task) {
    console.log(`Advent ${this.day} Task ${task}:`);
  }

  logResult(result) {
    console.log(`Result: ${result}`);
  }

  executeAdvent() {
    console.log();
    this.logStart(1);
    this.logResult(this.executeFirstAdvent());
    this.logStart(2);
    this.logResult(this.executeSecondAdvent());
    console.log();
  }

  executeFirstAdvent() {
    throw new Error('Not implemented');
  }

  executeSecondAdvent() {
    throw new Error('Not implemented');
  }
}

module.exports = Advent;
