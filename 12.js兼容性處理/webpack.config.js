const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      /*
        js兼容性處理 : babel-loader @babel/core
        
        1. 基本js兼容性處理 ==> @babel/preset-env
        設定 : 在下方設定
        問題 : 只能轉換基本語法，如promise無法轉換
        2. 全部js兼容性處理 ==> @babel/polyfill
        設定 : 在js中直接引入即可
        問題 : 我只要解決部分兼容性問題，但將所有兼容性代碼引入，體積過大
        3. 案須對js做兼容性處理 ==> core-js@3 (core-js會下載到舊版) 
      
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          //預設 : 指示babel如何處理兼容性處理
          //presets: ["@babel/preset-env"]
          presets: [
            [
              "@babel/preset-env",
              {
                //案需加載
                useBuiltIns: "usage",
                //指定coreJs版本
                corejs: {
                  version: 3,
                },
                //指定兼容性做到哪個版本
                targets: {
                  chrome: "75",
                  firefox: "60",
                  safari: "10",
                  ie: "9",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  mode: "development",
};
