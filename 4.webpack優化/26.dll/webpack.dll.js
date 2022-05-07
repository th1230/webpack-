const { resolve } = require("path");
const webpack = require("webpack");

/*
    使用dll技術 ， 對某些檔案(jquery、vue、react)進行單獨打包
    當運行webpack時預設會查找webpack.config.js配置文件
    需求 : 需要運行webpack.dll.js文件
    指令 : webpack --config webpack.dll.js
*/

module.exports = {
  entry: {
    //最終打包生成的[name]==>jquery
    //要打包的庫是["jquery"]
    jquery: ["jquery"],
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
    library: "[name]_[hash]", //打包的庫裡面向外暴路出去的內容較甚麼名字 (不能單純引入jquery因為有hash值)
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[hash]", //映射庫暴路的內容名稱
      path: resolve(__dirname, "dll/manifest.json"), // 輸出文件路徑
    }),
  ],
  mode: "production",
};
