const { resolve } = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    //文件名稱(指定名稱+目錄)
    filename: "js/[name].js",
    //所有輸出資源的公共路徑前墜
    publicPath: "",
    //將來所有資源輸出的公共目錄
    path: resolve(__dirname, "dist"),
    //非入口chunk的名稱
    chunkFilename: "[name]_chunk.js",
    //向外暴露變量名稱
    // library: "[name]",
    //將變量名添加到browser
    // libraryTarget: "window",
    //將變量名添加到node
    // libraryTarget: "global",
    // libraryTarget: "commonJs",
  },
  plugins: [new HtmlWepackPlugin()],
  mode: "development",
};
