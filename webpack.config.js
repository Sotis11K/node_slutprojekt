const path = require('path');

module.exports = {
  entry: './src/functionPlot.js',
  mode: 'production',
  output: {
    filename: './app.js',
    path: path.resolve(__dirname, 'public'),
  },
};