const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      {
        test: /\.css$/,
        //使用MiniCssExtractPlugin取代style 作用:將css圖取出來成為單獨文件
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          //預設配置"post-loader"
          /*
            css兼容性配置:postcss ->  postcss-preset-env postcss-loader postcss
            postcss-preset-env : 幫助postcss找到package.json中的browsersList配置，並通過該配置加載指定的css兼容性樣式

            "browserslist":{
              "development":[
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              "production":[
                ">0.2%",
                "not dead"
              ]
            }

            通過設定node環境變數調整使用的browsersList模式
            process.env.NODE_ENV = "development";
          
          */
          {
            loader: "postcss-loader",

            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
  ],
  mode: "development",
};
