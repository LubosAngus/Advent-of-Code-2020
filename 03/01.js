console.time('run')

const fs = require('fs')
const demo = false

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err)

    let input = data.trim().split('\n').filter(value => value)
    let answer = 0

    j = 0

    for (let i = 1; i < input.length; i++) {
        const overflow = input[i].length

        j = j + 3

        if (j >= overflow) {
            j = j - overflow
        }

        const possibleTree = input[i][j]

        if (possibleTree != '.') {
            answer++
        }

        input[i] = input[i].split('')
        input[i][j] = possibleTree == '.' ? 'O' : 'X'
        input[i] = input[i].join('')
    }

    // console.log(input.join('\n'))
    console.log(answer)
    console.timeEnd('run')
})
