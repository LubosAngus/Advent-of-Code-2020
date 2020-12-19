import fs from 'fs'

const adventOfCode = {
  isDemo: true,
  demoName: 'demo',
  currDir() {
    return process.cwd()
  },
  run() {
    console.time('run')

    fs.readFile(`${this.currDir()}/${this.isDemo ? this.demoName : 'input'}.txt`, 'utf8', (err, data) => {
      if (err) return console.log(err)

      const input = this.parseInput(data)
      this.callback(input)

      console.timeEnd('run')
    })
  },
  parseInput(data) {
    return data.trim().split('\n').filter(value => value)
  },
  callback(input) {
    console.table(input)
  }
}

export default adventOfCode