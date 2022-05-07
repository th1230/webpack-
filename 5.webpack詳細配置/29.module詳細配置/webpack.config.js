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
      //loader
      {
        test: /\.css$/,
        //多個loader用use
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        //單個loader用loader
        loader: "eslint-loader",
        //排除檢查/node_modules/下的文件
        exclude: /node_modules/,
        //只檢查src底下的文件
        include: resolve(__dirname, "src"),
        //優先執行
        enforce: "pre",
        //延後執行
        // enforce:"post,"
        options: {},
      },
    ],
  },
  plugins: [new HtmlWepackPlugin()],
  mode: "development",
};
