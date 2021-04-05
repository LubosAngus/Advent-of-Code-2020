import { readdirSync } from 'fs'
import prompts from 'prompts'
import { exec } from 'child_process'
import watch from 'node-watch'
import open from 'open'

let askingSubmit = false
let finalResult = false

const getDays = () => {
  return readdirSync(process.cwd(), { withFileTypes: true })
  .filter(file => file.isDirectory() && file.name !== '00' && /\d{2}/.exec(file.name))
  .map(file => ({ title: file.name, value: file.name }))
  .sort((a, b) => b.title - a.title)
}

const getScriptsInDay = (day) => {
  return readdirSync(`${process.cwd()}/${day}`, { withFileTypes: true })
  .filter(file => /\.js$/.exec(file.name))
  .map(file => ({ title: file.name, value: file.name }))
  .sort((a, b) => b.title[0] - a.title[0])
}

const askSubmit = (config) => {
  askingSubmit = true

  prompts([
    {
      type: 'confirm',
      name: 'submit',
      message: `Submit result?`,
      initial: false
    }
  ], { onCancel: () => process.exit() }).then((res) => {
    if (res.submit) {
      open(`https://adventofcode.com/2020/day/${config.day}?result=${finalResult}`)

      console.clear()
      console.log(`\n\x1b[32mSubmitting day ${config.day} result: \x1b[0m\x1b[45m${finalResult}\x1b[0m\n`)

      if (config.watch) {
        console.log(`\n\x1b[2m\x1b[32mIf you want to cancel this message,\njust save your file one more time.\x1b[0m\n`)
      }
    }

    askingSubmit = false
  })
}

const execute = (config) => {
  let infoMsg = ''

  if (config.watch) {
    infoMsg += `\n\x1b[46m\x1b[30m\x1b[1m Watching ${config.day}-${config.script.replace('.js', '')} \x1b[0m\n`
  }

  infoMsg += `\x1b[2m\x1b[36mYou can submit result by pressing \x1b[0m\x1b[36m\x1b[1mY\x1b[0m\n`

  if (!askingSubmit) {
    askSubmit(config)
  }

  console.clear()
  console.log(infoMsg)
  console.log(`\x1b[7m Running \x1b[0m\n`)

  exec(`cd ${config.day} && node ${config.script}`, (error, stdout, stderr) => {
    console.clear()
    console.log(infoMsg)

    if (error) {
      console.log(`\x1b[31mERROR:\n\n${error.message}\x1b[0m\n`)
      return
    }

    if (stderr) {
      console.log(`\x1b[31mSTDERR:\n\n${stderr}\x1b[0m\n`)
      return
    }

    console.log(stdout)
    finalResult = JSON.parse(JSON.stringify(/Your result is: (.*)/m.exec(stdout)[1]).replace(/\\u001b\[0m\\u001b\[45m(.*)\\u001b\[0m/, '$1'))
  })
}

(async () => {
  const config = await prompts([
    {
      type: 'select',
      name: 'day',
      message: 'Which day?',
      choices: getDays()
    },
    {
      type: 'select',
      name: 'script',
      message: 'Which script?',
      choices: (prev) => getScriptsInDay(prev)
    },
    {
      type: 'confirm',
      name: 'watch',
      message: 'Watch?',
      initial: true
    }
  ])

  if (!config.day || !config.script) {
    console.error("\x1b[45m Ain't no script to run \x1b[0m\n")
    return
  }

  askSubmit(config)
  execute(config)

  if (config.watch) {
    watch(`./${config.day}/${config.script}`, {}, function() {
      execute(config)
    })
  }
})()
