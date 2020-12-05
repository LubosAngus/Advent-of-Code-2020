console.time('run')

const fs = require('fs')
const demo = false

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err)

    const input = data.trim().split('\n').filter(value => value)

    let validCount = 0

    input.forEach(pass => {
        const matches = /(\d+)-(\d+) (.*): (.*)/gm.exec(pass)
        const min = matches[1]
        const max = matches[2]
        const target = matches[3]
        const password = matches[4]
        const passRegex = new RegExp(target, 'g')
        const finalMatches = password.match(passRegex) || []
        const occuranceLength = finalMatches.length

        if (
            password[min - 1] == target && password[max - 1] != target ||
            password[min - 1] != target && password[max - 1] == target
        ) {
            validCount++
        }
    })

    console.log(validCount)
    console.timeEnd('run')
})
