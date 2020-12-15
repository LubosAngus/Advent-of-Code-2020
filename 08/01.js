console.time('run')

const fs = require('fs')
const demo = false

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err)

    const input = data.trim().split('\n').filter(value => value)
    let run = 0
    let accumulator = 0

    for (let index = 0; index < input.length; index++) {
        const instruction = input[index]
        const splitted = instruction.split(' ')

        run++

        if (splitted[0] == 'xxx') {
            break
        }

        input[index] = `xxx | ${input[index]}`

        if (splitted[0] == 'acc') {
            accumulator = eval(`${accumulator}${splitted[1]}`)
        }
        else if (splitted[0] == 'jmp') {
            index = eval(`${index}${splitted[1]}-1`)
        }
    }

    console.log(accumulator)
    console.timeEnd('run')
})