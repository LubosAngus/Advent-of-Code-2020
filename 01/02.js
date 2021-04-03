import { AdventOfCode as BaseAdventOfCode } from '../AdventOfCode.js'

class AdventOfCode extends BaseAdventOfCode
{
  constructor (inputFileName) {
    this.inputAsInt = true

    super(inputFileName)
  }

  parseInput(data) {
    return data.trim().split('\n').filter(value => value).map(value => parseInt(value))
  }

  callback() {
    let result

    this.input.forEach(first => {
      this.input.forEach(second => {
        this.input.forEach(third => {
          if (first + second + third == 2020) {
            result = first * second * third
          }
        })
      })
    })

    return result
  }
}

new AdventOfCode('input').run()
