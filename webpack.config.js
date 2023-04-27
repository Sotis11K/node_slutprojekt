const path = require('path');

module.exports = {
  //entry: ['./src/functionPlot.js', './src/math.js'],
  entry: './src/functionPlot.js',
  mode: 'production',
  output: {
    filename: './app.js',
    path: path.resolve(__dirname, 'public'),
  }
};
