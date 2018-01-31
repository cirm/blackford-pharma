const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const { resolve } = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: [
    'babel-polyfill',
    './index.jsx',
  ],
  devtool: 'source-map',
  output: {
    filename: 'index.js',
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
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-modules-flow-types-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer({
                browsers: ['last 2 versions', '> 5%'],
              })],
            },
          },
          'stylus-loader'],
      }),
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

  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.woff', '.woff2'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new Visualizer(),
		new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
		new UglifyJsPlugin({	// remove this with Wp4
			sourceMap: true
		})
  ],
};