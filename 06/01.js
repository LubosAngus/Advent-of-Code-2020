console.time('run')

const fs = require('fs')
const demo = false

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err)

    const input = data.trim().replace(/^(.{1,})\n/gm, `$1 `).split('\n').filter(value => value)

    let answers = []

    input.forEach((group, groupId) => {
        answers[groupId] = []

        group.split(' ').forEach(personAnswers => {
            for (let i = 0; i < personAnswers.length; i++) {
                const answer = personAnswers[i]

                if (!answers[groupId].includes(answer)) answers[groupId].push(answer)
            }
        })
    })

    const result = answers.reduce((prev, curr) => prev + curr.length, 0)

    console.log(result)
    console.timeEnd('run')
})