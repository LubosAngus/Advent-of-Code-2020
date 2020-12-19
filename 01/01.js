import adventOfCode from '../base.js'

adventOfCode.isDemo = false

adventOfCode.callback = input => {
  let answer = false

  input = input.map(input => parseInt(input))

  input.forEach(first => {
    input.forEach(second => {
      if (first + second == 2020) {
        answer = first * second
      }
    })
  })

  console.log(answer)
}

adventOfCode.run()
