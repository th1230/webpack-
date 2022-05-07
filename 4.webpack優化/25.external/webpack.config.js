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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "production",
  externals: {
    //拒絕jquery進行打包
    //設定之後由於不會打包jquery所以需要另行引入
    jquery: "jQuery",
  },
};
