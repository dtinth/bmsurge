'use strict'

const generateWebpackConfig = require('./generateWebpackConfig')

module.exports = generateWebpackConfig({
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/html'
  },
}, {
  extractCSS: process.env.NODE_ENV === 'production'
})
