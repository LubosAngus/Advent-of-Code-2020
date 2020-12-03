console.time('run')

const fs = require('fs')
const demo = false

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', function (err, data) {
    if (err) return console.log(err)

    let input = data.trim().split('\n').filter(value => value)
    let answers = []
    let slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]

    slopes.forEach(slope => {
        let j = 0
        let answer = 0
        const overflow = input[0].length

        for (let i = slope[1]; i < input.length; i = i + slope[1]) {
            j = j + slope[0]

            if (j >= overflow) {
                j = j - overflow
            }

            const possibleTree = input[i][j]

            if (possibleTree == '#') {
                answer++
            }
        }

        answers.push(answer)
    });

    console.log(answers)
    console.log(eval(answers.join(' * ')))
    console.timeEnd('run')
})
