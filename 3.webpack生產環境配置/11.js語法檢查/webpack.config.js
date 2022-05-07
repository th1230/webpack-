const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//設定環境變數為開發模式
process.env.NODE_ENV = "development";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      /*
            語法檢查: eslint-loader(依賴於eslint)
            注意 : 只要檢查自己寫的代碼，第三方庫不用檢查
            使用的檢查規則 : airbnb
            airbnb(需要下載) --> eslint-config-airbnb-base eslint eslint-plugin-import 

            "eslintConfig":{
                "extends":"airbnb-base"
            }
        
        */
      //告訴webpack要檢查js檔案
      {
        test: /\.js$/,
        //不檢查node-modules
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  mode: "development",
};
