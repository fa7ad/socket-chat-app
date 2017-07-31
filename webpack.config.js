const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src', 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'main.js'
  },
  devtool: 'cheap-inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          disable: process.env.NODE_ENV !== 'production'
        })
      },
      {
        test: /\.(ttf|otf|woff|woff2|png|jpg|svg|gif)$/,
        loader: 'file-loader',
        query: {
          name: 'static/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
