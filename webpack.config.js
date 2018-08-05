const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  filename: './index.html',
});

module.exports = {
  entry: [
    'babel-polyfill',
    './index.jsx',
  ],
  devtool: 'eval-source-map',
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
      use: ['style-loader', 'css-modules-flow-types-loader',
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
    new WebpackMd5Hash(),
  ],
};
