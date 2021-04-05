import { AdventOfCode as BaseAdventOfCode } from '../AdventOfCode.js'

class AdventOfCode extends BaseAdventOfCode
{
  constructor (inputFileName) {
    super(inputFileName)

    this.possibleDifferences = [1, 2, 3]
  }

  parseInput(data) {
    this.input = data.trim().split('\n').filter(value => value).map(value => parseInt(value)).sort((a, b) => a - b)
    this.input.unshift(0)
    this.input.push(this.input[this.input.length - 1] + 3)

    return this.input.sort((a, b) => b - a)
  }

  getNextJoltages(index) {
    let nextJoltages = []

    for (let i = 0; i < 3; i++) {
      if (typeof this.input[index + i] === 'undefined') break

      nextJoltages.push(this.input[index + i])
    }

    return nextJoltages
  }

  callback() {
    for (let index = 0; index < this.input.length; index++) {
      if (typeof this.input[index + 1] === 'undefined') continue

      const currJoltage = this.input[index];
      const nextJoltages = this.getNextJoltages(index)

      for (let j = 0; j < this.possibleDifferences.length; j++) {
        if (nextJoltages) continue
      }
    }

    return
  }
}

new AdventOfCode('input').run()
