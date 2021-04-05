import { readdirSync } from 'fs'
import prompts from 'prompts'
import { exec } from "child_process"
import watch from 'node-watch'

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

const execute = (config) => {
  const infoMsg = config.watch ? `\n\x1b[46m\x1b[30m\x1b[1m Watching ${config.day}-${config.script.replace('.js', '')} \x1b[0m\n` : ''

  console.clear()
  console.log(infoMsg)
  console.log(`\x1b[7m Running \x1b[0m\n`)

  exec(`cd ${config.day} && node ${config.script}`, (error, stdout, stderr) => {
    console.clear()
    console.log(infoMsg)

    if (error) {
      console.log(`\x1b[45m error: ${error.message} \x1b[0m\n`);
      return;
    }

    if (stderr) {
      console.log(`\x1b[45m stderr: ${stderr} \x1b[0m\n`);
      return;
    }

    console.log(stdout);
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
      initial: true,
    }
  ])

  execute(config)

  if (config.watch) {
    watch(`./${config.day}/${config.script}`, {}, function() {
      execute(config)
    })
  }
})()