const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      { test: /\.css$/, use: ['style-loader, css-loader'] },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin(),
  ]
}