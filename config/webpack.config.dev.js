const commonConfig = require('./webpack.config.common');
const webpack = require('webpack');
var path = require('path');
commonConfig.devtool = 'eval-source-map';
commonConfig.devServer = {
  contentBase: path.join(__dirname, "/../public"),
  //stats: 'minimal',
  port: 3000,
  hot: true,
  host: 'localhost',
  open: true
};
commonConfig.module.rules.push({
  test: /\.less$/,
  use: [{
    loader: 'style-loader' // creates style nodes from JS strings
  }, {
    loader: 'css-loader' // translates CSS into CommonJS
  }, {
    loader: 'less-loader' // compiles Less to CSS        
  }]
});
commonConfig.plugins.push(
  new webpack.NamedModulesPlugin(), 
  new webpack.HotModuleReplacementPlugin()
);
module.exports = commonConfig;
