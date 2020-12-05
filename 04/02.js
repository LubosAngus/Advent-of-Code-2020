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
    const validator = {
        minMax: (value, min, max) => {
            let result = false

            value = parseInt(value)

            if (value >= min && value <= max) {
                result = true
            }

            return result
        },
        'byr': (value) => {
            return validator.minMax(value, 1920, 2002)
        },
        'iyr': (value) => {
            return validator.minMax(value, 2010, 2020)
        },
        'eyr': (value) => {
            return validator.minMax(value, 2020, 2030)
        },
        'hgt': (value) => {
            const is_cm = value.includes('cm')
            const is_in = value.includes('in')

            if (!is_cm && !is_in) return false

            value = parseInt(value)

            if (is_cm) {
                return validator.minMax(value, 150, 193)
            } else {
                return validator.minMax(value, 59, 76)
            }
        },
        'hcl': (value) => {
            return /#[0-9a-f]{6}/.exec(value) !== null
        },
        'ecl': (value) => {
            return ['amb','blu','brn','gry','grn','hzl','oth'].includes(value)
        },
        'pid': (value) => {
            return /^\d{9}$/.exec(value) !== null
        },
        'cid': () => true
    }

    let result = 0

    input.forEach(passport => {
        let valid = false

        if (passport.includesAll(['byr:','iyr:','eyr:','hgt:','hcl:','ecl:','pid:'])) {
            valid = true
        }

        if (valid) {
            passport.split(' ').filter(v => v).forEach(values => {
                const value = values.split(':')
                const currValidator = validator[value[0]]

                if (valid && !currValidator(value[1])) {
                    valid = false
                }
            })
        }

        if (valid) result++
    })

    console.log(result);
    console.timeEnd('run')
})