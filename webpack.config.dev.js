const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

const nodeModules = fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1
}).reduce(function (acc, curr) {
  acc[curr] = 'commonjs ' + curr

  return acc
}, {})

module.exports = {
  target: 'node',

  entry: './src/index.js',

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins,
  externals: nodeModules
}
