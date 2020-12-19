import adventOfCode from '../base.js'

adventOfCode.isDemo = false

adventOfCode.callback = input => {
  let answer = false

  input = input.map(input => parseInt(input))

  input.forEach(first => {
    input.forEach(second => {
      input.forEach(third => {
        if (first + second + third == 2020) {
          answer = first * second * third
        }
      })
    })
  })

  console.log(answer)
}

adventOfCode.run()
