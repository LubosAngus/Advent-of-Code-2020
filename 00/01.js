console.time('run')

const fs = require('fs')
const demo = true

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', function (err, data) {
    if (err) return console.log(err)

    const input = data.trim().split('\n').filter(value => value)



    console.timeEnd('run')
})
