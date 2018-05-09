const path = require('path')
const webpack = require('webpack')

const config = {
  mode: 'none',
  entry: {
    aoec: './src/index.js',
    demo: './demo/index-browser.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  module: {
    rules: [{
      test: /\.js/,
      include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'demo')],
      use: [{
        loader: 'babel-loader',
        options: { presets: ['env'] }
      }]
    }]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: { loader: 'eslint-loader' } })
  ]
}

module.exports = config
