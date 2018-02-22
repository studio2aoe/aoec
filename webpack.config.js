const path = require('path')
const webpack = require('webpack')

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    aoec: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].bundle.js',
    libraryTarget: 'umd',
    library: 'Aoec'
  },
  module: {
    rules: [
      // Compile ES6
      {
        test: /\.js/,
        include: path.resolve(__dirname, 'src'),
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
