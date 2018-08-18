'use strict';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');


module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{ // JS LOADER
      // Transpile .js files using babel-loader
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    },
    { // Bootstarp loader
      test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports-loader?jQuery=jquery'
    },
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    },
    {
      // ASSET LOADER
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|json)$/,
      loader: 'file-loader?name=images/[name].[ext]'
    },
    {
      // HTML LOADER
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.less$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname + '/../home.html'),
        inject: 'body'
      })
  ]
};
