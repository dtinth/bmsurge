'use strict'

const path = require('path')
const fs = require('fs')
const name = process.argv[2]
const base = path.basename(name)

fs.writeFileSync(name + '.js', `
import { h } from 'preact'
import styles from './${base}.styl'

const ${base} = ({ }) => (
  <div className={styles.root}>
  </div>
)

export default ${base}
`)

fs.writeFileSync(name + '.styl', `
.root
  display block
`)
