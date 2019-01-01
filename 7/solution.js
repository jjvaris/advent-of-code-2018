const Advent = require('../advent');

class Solution extends Advent {
  constructor(day) {
    super(day);
    this.input = super.getFileLines('input.txt');
  }

  executeFirstAdvent() {
    const instructions = this._getInstructions();
    return this._calculateAssemblyOrder(instructions);
  }

  _getInstructions() {
    return this.input.reduce((items, item) => {
      const letter = item.charAt(36);
      const dependency = item.charAt(5);
      if (!items[dependency]) items[dependency] = new Instruction(dependency);
      if (!items[letter]) {
        items[letter] = new Instruction(letter, [dependency]);
      } else {
        items[letter].dependencies.push(dependency);
      }
      return items;
    }, {});
  }

  _calculateAssemblyOrder(instructions) {
    let order = '';
    while (!this._isAllReady(instructions)) {
      let availableItems = this._getAvailableItems(instructions);

      let next = availableItems[0];

      next.ready = true;
      order += next.letter;
    }
    return order;
  }

  _isAllReady(instructions) {
    for (const [k, v] of Object.entries(instructions)) {
      if (!v.ready) return false;
    }
    return true;
  }

  _getAvailableItems(instructions) {
    return Object.entries(instructions)
      .reduce((items, [k, v]) => {
        if (!v.ready && this._isAvailable(v.dependencies, instructions))
          items.push(v);
        return items;
      }, [])
      .sort((a, b) => (a.letter < b.letter ? -1 : 1));
  }

  _isAvailable(dependencies, instructions) {
    for (const dependency of dependencies) {
      if (!instructions[dependency].ready) return false;
    }
    return true;
  }

  executeSecondAdvent() {
    const instructions = this._getInstructions();
    const workers = Array(5)
      .fill()
      .map(i => new Worker());

    let second = 0;
    while (!this._isAllReady(instructions)) {
      let availableItems = this._getAvailableItems(instructions).filter(
        i => !i.assigned
      );

      for (const item of availableItems) {
        const availableWorkers = workers.filter(worker => !worker.isWorking());
        if (availableWorkers) {
          const worker = availableWorkers[0];
          worker.assignTask(item);
        }
      }

      workers.forEach(worker => worker.tick());

      second++;
    }
    return second;
  }
}

class Instruction {
  constructor(letter, dependencies) {
    this.letter = letter;
    this.dependencies = dependencies || [];
    this.ready = false;
    this.assigned = false;
  }
}

class Worker {
  constructor() {
    this.timeLeft = 0;
    this.task = undefined;
  }

  isWorking() {
    return this.timeLeft > 0;
  }

  assignTask(instruction) {
    this.task = instruction;
    this.task.assigned = true;
    this.timeLeft = instruction.letter.charCodeAt(0) - 64 + 60;
  }

  tick() {
    this.timeLeft--;
    if (this.timeLeft === 0) {
      this.task.ready = true;
    }
  }
}

module.exports = Solution;
