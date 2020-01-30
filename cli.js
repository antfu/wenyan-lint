#!/usr/bin/env node

const commander = require('commander')
const fs = require('fs')
const fg = require('fast-glob')
const consola = require('consola')
const { format } = require('.')

const program = new commander.Command()

async function formatFiles(globs = [], options = {}) {
  globs = globs.map(g => g.replace(/\\/g, '/'))
  const files = await fg(globs, { absolute: true });

  for (const filepath of files) {
    try {
      const file = fs.readFileSync(filepath, 'utf-8')
      const formatted = format(file, {
        space: options.space,
        tabSize: options.tabSize,
      })
      fs.writeFileSync(filepath, formatted, 'utf-8')
      consola.success('Formatted ' + filepath)
    } catch (e) {
      consola.error(e)
      process.exit(1)
    }
  }
}

program
  .name('wylint')

program
  .command('format [files...]')
  .description('format wy files')
  .option('-s, --tab-size <size>', 'Tab size', 2)
  .option('--space', 'Prefer spaces', false)
  .action(formatFiles)

program
  .command('lint [files...]')
  .description('lint files')
  .action(() => {
    consola.warn('Working in progress')
  })

program.parse(process.argv)
