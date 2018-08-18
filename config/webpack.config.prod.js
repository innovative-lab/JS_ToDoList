const commonConfig = require('./webpack.config.common');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const cmd=require('child_process');
const argv = require('yargs').argv;

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
commonConfig.module.rules.push(
  {
    test: /\app.backend.js$/,
    loader: 'string-replace-loader',
    options: {
      search: 'service-url-to-be-changed-on-build',
      replace: argv.define,
      flags: 'g'
    }
  }
);
commonConfig.plugins.push(
// Extract all 3rd party modules into a separate 'vendor' chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: ({ resource }) => /node_modules/.test(resource),
  }),

// Generate a 'manifest' chunk to be inlined in the HTML template
  new webpack.optimize.CommonsChunkPlugin('manifest'),

   // Need this plugin for deterministic hashing
    new WebpackMd5Hash(),


  new webpack.NoEmitOnErrorsPlugin(),
  new CopyWebpackPlugin([{
    from: __dirname + '/../public'
  }]),
  new webpack.optimize.UglifyJsPlugin({
    mangle: false
  }),
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
