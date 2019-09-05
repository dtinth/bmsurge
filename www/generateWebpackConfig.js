
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

function generateWebpackConfig (config, options) {
  const extractor = options.extractCSS ? new ExtractTextPlugin('style.css') : null
  const cssLoader = (() => {
    const cssOptions = '?modules&localIdentName=[name]の[local]／[hash:base64:7]&importLoaders=2!postcss-loader!stylus-loader'
    if (options.prerender) {
      return 'css-loader/locals' + cssOptions
    }
    const cssNotExtractLoader = 'style-loader'
    const cssExtractLoader = 'css-loader' + cssOptions
    return (extractor
      ? extractor.extract(cssNotExtractLoader, cssExtractLoader)
      : cssNotExtractLoader + '!' + cssExtractLoader
    )
  })()
  config.module = {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname + '/src',
        loaders: [ 'babel' ]
      },
      {
        test: /\.styl$/,
        loader: cssLoader
      },
      {
        test: /\.md$/,
        loader: 'raw!markdown-it'
      }
    ]
  }
  config.postcss = function () {
    return [ require('autoprefixer') ]
  }
  if (!config.plugins) config.plugins = [ ]
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }))
  if (extractor) {
    config.plugins.push(extractor)
  }
  return config
}


module.exports = generateWebpackConfig
