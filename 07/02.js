console.time('run')

const fs = require('fs')
const demo = true

const snakeCase = (str) => {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).map(x => x.toLowerCase()).join('_')
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

  const getCount = (color, result = 0) => {
    const colorContents = bags[color]

    let insideCount = 0

    for (const subColor in colorContents) {
      if (bags[subColor] === {}) continue

      insideCount = bags[color][subColor]
      result = getCount(subColor, result)

      // for (const subSubColor in bags[subColor]) {
      //   insideCount += bags[subSubColor]
      // }
      // console.log(subColor)
    }

    console.log(result)
    console.log(insideCount)
    console.log('-')

    return result + result * insideCount
  }

  const shinyContents = getCount('shiny_gold')

  console.log(''.padStart(20, '-'))
  console.log(shinyContents)
  console.timeEnd('run')
})
