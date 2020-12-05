console.time('run')

const fs = require('fs')
const demo = false

fs.readFile(`${demo ? 'demo' : 'input'}.txt`, 'utf8', (err, data) => {
    if (err) return console.log(err)

    const input = data.trim().split('\n').filter(value => value)

    let result = 0

    input.forEach(instructions => {
        let rowsRange = [...Array(128).keys()]
        let colsRange = [...Array(8).keys()]

        for (let i = 0; i < instructions.length; i++) {
            const rowsHalf = Math.ceil(rowsRange.length / 2)
            const colsHalf = Math.ceil(colsRange.length / 2)

            switch (instructions[i]) {
                case 'F':
                    rowsRange = rowsRange.splice(0, rowsHalf)
                    break

                case 'B':
                    rowsRange = rowsRange.splice(-rowsHalf)
                    break

                case 'L':
                    colsRange = colsRange.splice(0, colsHalf)
                    break

                case 'R':
                    colsRange = colsRange.splice(-colsHalf)
                    break
            }
        }

        const id = rowsRange[0] * 8 + colsRange[0]
        if (id > result) result = id

        console.log(`row ${String(rowsRange[0]).padEnd(8, ' ')}col ${String(colsRange[0]).padEnd(8, ' ')}ID ${id}`)
    })

    console.log(''.padEnd(30,'-'))
    console.log(result)
    console.timeEnd('run')
})
