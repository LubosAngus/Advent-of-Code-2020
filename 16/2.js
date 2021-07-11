import { AdventOfCode as BaseAdventOfCode } from '../AdventOfCode.js'

class AdventOfCode extends BaseAdventOfCode
{
  constructor (inputFileName) {
    super(inputFileName)

    this.inputData = null
  }

  parseInput(data) {
    this.inputData = data
  }

  get validValues() {
    const regex = /(\w+): (.+) or (.+)/gm;
    let fields = {};
    let m;

    while ((m = regex.exec(this.inputData)) !== null) {
      if (m.index === regex.lastIndex) regex.lastIndex++

      let field = null
      let validValues = []

      m.forEach((match, groupIndex) => {
        if (groupIndex == 0) {}
        else if (groupIndex == 1) field = match
        else {
          const range = match.split('-')
          for (let index = parseInt(range[0]); index <= parseInt(range[1]); index++) {
            validValues.push(index)
          }
        }
      })

      fields[field] = validValues
    }

    return fields
  }

  get nearbyTickets() {
    const nearbyTickets = /nearby tickets:\n(.*)/s.exec(this.inputData)[1].split('\n').map(v => v.split(',').map(Number))
    const allValidValues = Object.values(this.validValues).reduce((accumulator, current) => [...accumulator, ...current], [])

    for (let ticketIndex = 0; ticketIndex < nearbyTickets.length; ticketIndex++) {
      const ticket = nearbyTickets[ticketIndex]

      for (const value of ticket) {
        if (!allValidValues.includes(value)) {
          nearbyTickets.splice(ticketIndex, 1)
        }
      }
    }

    return nearbyTickets
  }

  get myTicket() {
    return /your ticket:\n(.*)/.exec(this.inputData)[1].split('\n').map(v => v.split(',').map(Number))
  }

  get allTickets() {
    return [...this.myTicket, ...this.nearbyTickets]
  }

  get correctFields() {
    const correctFields = []

    for (let ticketIndex = 0; ticketIndex < this.allTickets.length; ticketIndex++) {
      const ticket = this.allTickets[ticketIndex]

      console.log(ticket)
    }

    return correctFields
  }

  callback() {
    console.table(this.correctFields)

    // const allValidValues = Object.values(this.fields).reduce((accumulator, current) => {
    //   return [...accumulator, ...current]
    // }, [])

    // for (const ticket of this.nearbyTickets) {
    //   for (const value of ticket) {
    //     if (!allValidValues.includes(value)) {
    //       this.invalidValues.push(value)
    //     }
    //   }
    // }

    return 'lel'
    // return eval(this.invalidValues.join('+'))
  }
}

new AdventOfCode('demo2').run()
