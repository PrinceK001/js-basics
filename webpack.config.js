const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: "production",
  // mode: "development",
  // devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};