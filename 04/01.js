console.time('run')

const fs = require('fs')
const demo = false

String.prototype.includesAll = function (search) {
    'use strict';

    for (let i = 0; i < search.length; i++) {
        if (!this.includes(search[i])) return false
    }

    return true
}

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err)

    const input = data.trim().replace(/^(.{1,})\n/gm, `$1 `).split('\n').filter(value => value)
    const required = ['byr:','iyr:','eyr:','hgt:','hcl:','ecl:','pid:']

    let result = 0

    input.forEach(passport => {
        if (passport.includesAll(required)) result++
    })

    console.log(result);
    console.timeEnd('run')
})