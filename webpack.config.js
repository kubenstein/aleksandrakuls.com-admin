var webpack = require('webpack')
var CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    preLoaders: process.env.NODE_ENV !== 'production' ? [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: __dirname + '/src',
      }
    ] : [],

    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        query: {
          presets: ['stage-0', 'es2015', 'react']
        }
      }
    ]
  },

  resolve: {
    root: [
      __dirname + '/src/'
    ]
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/
    })
  ] : [],

}