const merge = require('webpack-merge');
const path = require('path');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const prod = require('./webpack.prod.js');

module.exports = merge(prod, {
  plugins: [
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, './build'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      penthouse: {
        blockJSRequests: false,
      }
    })
  ]
});
