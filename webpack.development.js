const merge = require("webpack-merge");
const {mainConfig, rendererConfig} = require("./webpack.common.js");

const development = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
}

const main = merge(mainConfig, development);
const render = merge(rendererConfig, development);

module.exports = [main, render];
