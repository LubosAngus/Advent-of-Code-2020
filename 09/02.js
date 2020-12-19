import adventOfCode from '../base.js'

adventOfCode.parseInput = (data) => data.trim().split('\n').filter(value => value).map(value => parseInt(value))
adventOfCode.isDemo = false
adventOfCode.demoName = 'demo_3'

adventOfCode.callback = input => {
  const firstResult = 373803594
  const contigousSet = []
  let answer = false

  for (let i = 0; i < input.length; i++) {
    let res = 0

    for (let j = i; j < input.length; j++) {
      res = res + input[j]

      if (res > firstResult) {
        break
      }

      if (res === firstResult && i !== j) {
        for (let k = i; k <= j; k++) {
          contigousSet.push(input[k])
        }

        contigousSet.sort()
        answer = contigousSet[0] + contigousSet[contigousSet.length - 1]

        break
      }
    }

    if (answer !== false) {
      break
    }
  }

  console.log(answer)
}

adventOfCode.run()
