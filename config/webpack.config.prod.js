const commonConfig = require('./webpack.config.common');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const extractLessPlugin = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true
});
const extractLessLoader = extractLessPlugin.extract({
  fallback: 'style-loader',
  use: [{ loader: 'css-loader', options: { minimize: true } }, 'less-loader'],
  publicPath: '/'
});

const lessLoaderRule = {
  test: /\.less$/,
  loader: extractLessLoader
};

commonConfig.devtool = 'source-map';
commonConfig.module.rules.push(lessLoaderRule);

commonConfig.plugins.push(

  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([{
    from: __dirname + '/../src'
  }]),
  extractLessPlugin
);

commonConfig.output = {
  path: path.resolve(__dirname + '/../dist'),


  // Output path from the view of the page
  // Uses webpack-dev-server in development
  publicPath: '/',
  // Filename for entry points
  // Only adds hash in build mode
  filename: '[name].[chunkhash].js',

  // Filename for non-entry points
  // Only adds hash in build mode
  chunkFilename: '[name].[chunkhash].js'
};
module.exports = commonConfig;
