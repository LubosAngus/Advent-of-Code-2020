import { AdventOfCode as BaseAdventOfCode } from '../AdventOfCode.js'

class AdventOfCode extends BaseAdventOfCode
{
  constructor (inputFileName) {
    this.inputAsInt = true

    super(inputFileName)
  }

  callback() {
    let result

    this.input.forEach(first => {
      this.input.forEach(second => {
        if (first + second == 2020) {
          result = first * second
        }
      })
    })

    return result
  }
}

new AdventOfCode('input').run()
