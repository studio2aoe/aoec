const path = require('path')
const webpack = require('webpack')

const config = {
  entry: {
    aoec: './src/index.js',
    demo: './demo/index-browser.js'
  },
  output: {
    filename: './dist/[name].bundle.js',
    libraryTarget: 'umd',
    library: '[name]'
  },
  module: {
    rules: [
      // Compile ES6
      {
        test: /\.js/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'demo')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env'
              ]
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}

module.exports = config
