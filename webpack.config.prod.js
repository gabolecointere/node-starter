const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // this may be not necessary since webpack 2
      // inject it with -p command line option
      // but is open for setting your own envs as well
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.optimize.UglifyJsPlugin({
    sourcemap: false
  })
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
    path: path.resolve(__dirname, 'build'),
    filename: 'server.min.js'
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
