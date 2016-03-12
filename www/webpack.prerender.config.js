'use strict'

const nodeExternals = require('webpack-node-externals')
const generateWebpackConfig = require('./generateWebpackConfig')

module.exports = generateWebpackConfig({
  entry: './src/serverRender.js',
  output: {
    path: __dirname + '/build',
    filename: 'serverRender.bundle.js'
  },
  target: 'node',
  externals: [ nodeExternals() ]
}, {
  prerender: true
})
