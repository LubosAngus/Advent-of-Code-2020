import adventOfCode from '../base.js'

adventOfCode.parseInput = (data) => data.trim().split('\n').filter(value => value).map(value => parseInt(value))
adventOfCode.isDemo = false
adventOfCode.demoName = 'demo_3'

adventOfCode.isValid = (number, toCalc) => {
  let result = false

  for (let i = 0; i < toCalc.length; i++) {
    for (let j = 0; j < toCalc.length; j++) {
      if (i == j) continue

      if (toCalc[i] + toCalc[j] == number) {
        result = true

        break
      }
    }
  }

  return result
}

adventOfCode.callback = input => {
  let result = []
  let answer = false
  const permable = 25

  for (let index = permable; index < input.length; index++) {
    const number = input[index];
    const toCalc = []

    for (let j = 1; j <= permable; j++) {
      toCalc.push(input[index - j]);
    }

    const isValid = adventOfCode.isValid(number, toCalc)

    if (!isValid) {
      answer = number

      break
    }
  }

  console.log(answer)

  return answer
}

adventOfCode.run()
