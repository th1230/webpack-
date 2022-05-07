const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//webpack不須下載，為內建
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/main.js",
    //由於並非所有生態系統工具都已準備好使用新的默認自動publicPath，所以必須設置publicPath: ""以防止出現auto的path
    publicPath: "",
    path: resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    //告訴webpack哪些包不參與打包，同時使用名稱與得變
    new webpack.DllReferencePlugin({
      context: join(__dirname),
      manifest: require("./dll/manifest.json"),
    }),
    //將某個檔案打包輸出出去，並在html中引入該資源
    new AddAssetHtmlPlugin({
      filepath: resolve(__dirname, "./dll/jquery.js"),
      //設置輸出的資料夾位置
      outputPath: "js",
      //設置根目錄
      publicPath: "js",
    }),
  ],
  mode: "production",
};
