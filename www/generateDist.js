'use strict'

const fs = require('fs')

const html = (fs.readFileSync('html/index.html', 'utf8')
  .replace(/<!-- style -->/, () => '<style>' + fs.readFileSync('build/style.css', 'utf8') + '</style>')
  .replace(/<!-- main[\s\S]*end main -->/, () => '<main>' + fs.readFileSync('build/main.html', 'utf8') + '</main>')
  .replace(/<!-- script[\s\S]*end script -->/, () => '<script>' + fs.readFileSync('build/bundle.js', 'utf8') + '</script>')
)

process.stdout.write(html)
