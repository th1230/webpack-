const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  //設定為production模式會開啟js壓縮
  mode: "production",
};
