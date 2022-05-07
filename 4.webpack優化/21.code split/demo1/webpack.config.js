const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //單入口
  // entry: "./src/js/index.js",
  //多入口，有一個入口就會輸出一個bundle
  entry: {
    main: "./src/js/index.js",
    add: "./src/js/add.js",
  },
  output: {
    // [name] : 取文件名，根據entry設定的名稱設定對應的名字
    filename: "js/[name].[contenthash:8].js",
    path: resolve(__dirname, "dist"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: "production",
};
