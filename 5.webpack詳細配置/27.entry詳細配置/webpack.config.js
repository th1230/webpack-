const { resolve } = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");

module.exports = {
  /*
        entry : 入口起點
        1. String --> ./src/js/index.js
          單入口
          打包生成一個chunk。輸出一個bundle
          此時chunk的默認值是main
        2. Array --> ["./src/js/index.js", "./src/js/add.js"]
          多入口
          所有入口文件最終只會形成一個chunk，輸出出去只有一個bundle文件
          作用 : 讓html HMR生效
        3. Object
          多入口
          有幾個入口就形成幾個chunk，輸出幾個bundle文件
          此時的chunk名稱是 key

          特殊用法 : 
          entry: {
             //所有入口形成一個chunk，輸出出去只有一個bundle文件
             index: ["./src/js/index.js", "./src/js/add.js"],
             //形成一個chunk，輸出成一個bundle文件
             count: "./src/js/count.js",
          },
  */
  entry: {
    index: ["./src/js/index.js", "./src/js/add.js"],
    count: "./src/js/count.js",
  },
  output: {
    filename: "[name].js",
    publicPath: "",
    path: resolve(__dirname, "dist"),
  },
  plugins: [new HtmlWepackPlugin()],
  mode: "development",
};
