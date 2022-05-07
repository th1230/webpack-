const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    //loader配置
    rules: [],
  },

  //plugin配置
  plugins: [
    //HtmlWebpackPlugin
    //功能 : 預設會創建一個空的HTML，自動引入打包輸出的所有資源(JS/CSS)
    //需求 : 需要一個有結構的HTML文件
    new HtmlWebpackPlugin({
      //複製"./src/index.html"並自動引入打包輸出的所有資源(JS/CSS)
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
