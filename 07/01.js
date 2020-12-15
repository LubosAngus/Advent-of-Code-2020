console.time('run')

const fs = require('fs')
const demo = false

const snakeCase = (str) => {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_')
}

const couldHold = (bags, color, result = []) => {
  for (const bagColor in bags) {
    const bagContents = bags[bagColor]

    if (Object.keys(bagContents).includes(color)) {
      if (!result.includes(bagColor)) {
        result.push(bagColor)
      }

      result = couldHold(bags, bagColor, result)
    }
  }

  return result
}

fs.readFile(`${demo ? 'demo_01' : 'input'}.txt`, 'utf8', (err, data) => {
  if (err) return console.log(err)

  const input = data.trim().split('\n').filter(value => value)

  let bags = {}

  for (const rule of input) {
    const splitted = rule.split(' bags contain ')
    const currentColor = snakeCase(splitted[0])
    const contents = splitted[1].split(', ')

    if (typeof bags[currentColor] === 'undefined') {
      bags[currentColor] = {}
    }

    for (const item of contents) {
      if (item.includes('no other')) {
        continue
      }

      const matches = /(\d) (.*) bag/.exec(item)
      const count = parseInt(matches[1])
      const color = snakeCase(matches[2])

      bags[currentColor][color] = count

      if (typeof bags[color] === 'undefined') {
        bags[color] = {}
      }
    }
  }

  let canHoldShinyGold = couldHold(bags, 'shiny_gold')

  console.table(canHoldShinyGold)
  console.log(canHoldShinyGold.length)
  console.timeEnd('run')
})
