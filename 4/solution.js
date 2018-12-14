const Advent = require('../advent');

class Advent4 extends Advent {
  constructor(day) {
    super(day);
  }

  executeFirstAdvent() {
    const guards = this.buildGuardsObject();
    const id = Object.entries(guards).reduce((a, b) => {
      return a[1].count > b[1].count ? a : b;
    })[0];
    return (
      id *
      Object.entries(guards[id].minutes).reduce((a, b) => {
        return a[1] > b[1] ? a : b;
      })[0]
    );
  }

  executeSecondAdvent() {
    const guards = this.buildGuardsObject();
    let max = 0;
    let minute;
    let id;
    for (const [i, v] of Object.entries(guards)) {
      for (const [m, count] of Object.entries(v.minutes)) {
        if (max < count) {
          max = count;
          minute = m;
          id = i;
        }
      }
    }
    return id * minute;
  }

  buildGuardsObject() {
    const lines = super.getFileLines('input.txt').sort();
    const guards = {};
    let guardId;
    let startSleep = 0;
    let wakesUp = 0;
    lines.forEach(line => {
      if (line.match(/#\d+/g)) {
        guardId = parseInt(line.match(/#\d+/g)[0].substring(1));
      } else if (line.includes('falls asleep')) {
        startSleep = parseInt(line.substring(15, 17));
      } else if (line.includes('wakes up')) {
        wakesUp = parseInt(line.substring(15, 17));
        if (!guards[guardId]) guards[guardId] = { count: 0, minutes: {} };
        guards[guardId].count += wakesUp - startSleep;
        for (let i = startSleep; i < wakesUp; i++) {
          if (!guards[guardId].minutes[i]) {
            guards[guardId].minutes[i] = 0;
          }
          guards[guardId].minutes[i]++;
        }
      }
    });
    return guards;
  }
}

module.exports = Advent4;
