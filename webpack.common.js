const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const argv = require('yargs').argv;

const outputPath = path.resolve(__dirname, './build');
const isProduction = argv.mode === 'production';
const isDevelopment = !isProduction;

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, outputPath],
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.scss$/,
        use: [
          isDevelopment ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: [/node_modules/, outputPath],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[hash].[ext]',
              outputPath: 'images'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].[hash].js',
    pathinfo: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/assets/index.html'),
      filename: 'index.html',
      path: outputPath
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@app': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: outputPath,
    port: 3000,
    historyApiFallback: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false,
    disableHostCheck: true
  }
};
