const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //單入口
  entry: "./src/js/index.js",
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
  /*
    可以將node_module中的代碼獨立打包成一個chunk最終輸出
    自動分析多入口中是否有相同的公共文件，如果有會打包成一個單獨的chunk
  */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",
};
