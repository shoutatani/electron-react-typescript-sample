const merge = require("webpack-merge");
const {mainConfig, rendererConfig} = require("./webpack.common.js");

const prod = {
  mode: "production"
};

const main = merge(mainConfig, prod);
const render = merge(rendererConfig, prod);

module.exports = [main, render];
