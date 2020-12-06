console.time('run')

const fs = require('fs')
const demo = false

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err)

    const input = data.trim().replace(/^(.{1,})\n/gm, `$1 `).split('\n').filter(value => value)

    let answers = []

    input.forEach((group, groupId) => {
        answers[groupId] = group.trim().split(' ').reduce((prev, curr) => {
            const personsAnswers = curr.split('')

            if (prev === false) {
                prev = personsAnswers
            }
            else {
                prev = prev.filter(value => personsAnswers.includes(value))
            }

            return prev
        }, false)
    })

    const result = answers.reduce((prev, curr) => prev + curr.length, 0)

    console.log(result)
    console.timeEnd('run')
})