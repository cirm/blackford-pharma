const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  filename: './index.html',
});

const miniCssExtract = new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].css',
});

module.exports = {
  entry: [
    'babel-polyfill',
    './index.jsx',
  ],
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: resolve(__dirname, 'public'),
  },

  context: resolve(__dirname, 'src'),


  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.styl$/,
      use: [MiniCssExtractPlugin.loader, 'css-modules-flow-types-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoader: 2,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './config/postcss.config.js',
          },
        },
      },

          'stylus-loader'],
    }, {
      test: /\.png$/,
      loader: 'url-loader',
      query: { mimetype: 'image/png' },
    }, {
      test: /\.woff$/,
      loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=src/fonts/[name].[ext]',
    }, {
      test: /\.woff2$/,
      loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=src/fonts/[name].[ext]',
    }],
  },
  devServer: {
    publicPath: '/',
    contentBase: resolve(__dirname, 'public'),
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.woff', '.woff2'],
  },

  plugins: [
    htmlPlugin,
    miniCssExtract,
    new WebpackMd5Hash(),
  ],
};