const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/*
      tree shaking : 去除無用代碼
      前提 : 1. 必須使用es6模塊化 2. 開啟production環境
      作用 : 減少代碼體積

      在package.json中配置
      "sideEffects":false  所有代碼都沒有副作用(都可進行tree shaking)
      問題 : 可能會把css / @babel/polyfill 文件刪除
      "sideEffects":["*.css","*.scss"]

*/

process.env.NODE_ENV = "production";

let commonCss = [
  MiniCssExtractPlugin.loader,
  "css-loader",
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
];

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.[contenthash:8].js",
    path: resolve(__dirname, "dist"),
    assetModuleFilename: "asset/[contenthash:8][ext]",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: {
                  version: 3,
                },
                targets: {
                  chrome: "100",
                },
              },
            ],
          ],
          //開啟babel緩存
          cacheDirectory: true,
        },
      },
    ],
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
  mode: "production",
};
