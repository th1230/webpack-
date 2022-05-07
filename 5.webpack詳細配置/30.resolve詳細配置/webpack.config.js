const { resolve } = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  //解析模塊的規則
  resolve: {
    //配置路徑別名，優點簡寫路徑，缺點沒有提示
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    //配置省略文件路徑後墜名
    extensions: [".js"],
    //告訴webpack解析模塊優先去哪裡找
    modules: [resolve(__dirname, "../../node_modules")],
  },
  plugins: [new HtmlWepackPlugin()],
  mode: "development",
};
