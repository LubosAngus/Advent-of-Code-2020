import { AdventOfCode as BaseAdventOfCode } from '../AdventOfCode.js'

class AdventOfCode extends BaseAdventOfCode
{
  constructor (inputFileName) {
    super(inputFileName)
  }

  callback() {
    let validCount = 0

    this.input.forEach(pass => {
        const matches = /(\d+)-(\d+) (.*): (.*)/gm.exec(pass)
        const min = matches[1]
        const max = matches[2]
        const target = matches[3]
        const password = matches[4]
        const passRegex = new RegExp(target, 'g')
        const finalMatches = password.match(passRegex) || []
        const occuranceLength = finalMatches.length

        if (
            password[min - 1] == target && password[max - 1] != target ||
            password[min - 1] != target && password[max - 1] == target
        ) {
            validCount++
        }
    })

    return validCount
  }
}

new AdventOfCode('input').run()
