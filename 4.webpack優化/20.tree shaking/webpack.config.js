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
        //在package.json中加入eslintConfig 設定要使用的規則--> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        //設定此屬性代表優先執行此loader
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        //以下loader只能匹配一個
        //注意 : 不能有兩個配置處理一個文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCss],
          },
          {
            test: /\.(scss|sass)$/,
            use: [...commonCss, "sass-loader"],
          },
          {
            test: /\.html/,
            loader: "html-loader",
          },
          {
            //exclude排除css/html/js/scss資源
            exclude: /\.(css|html|js|scss)$/,
            //使用資源模塊搬移檔案
            type: "asset/resource",
          },
          /*
            這裡須注意，正常來講一個文件被一個loader處理。
            當一個文件需要被多個loader處理，那麼一定要指定其執行順序。
            eslint必須優先執行，在執行babel 
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
              //開啟babel緩存
              cacheDirectory: true,
            },
          },

          {
            test: /\.(png|jpg|gif)$/,
            type: "asset/inline",
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        //清除空白
        collapseWhitespace: true,
        //清除註釋
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.[contenthash].css",
    }),
  ],
  mode: "production",

  devServer: {
    static: {
      //告訴服務器從哪裡提供內容
      directory: join(__dirname, "dist"),
    },
    //自動開啟網頁
    open: true,
    //執行壓縮
    compress: true,
    //設置端口
    port: 5000,
  },

  optimization: {
    //webpack5以上已將 OptimizeCssAssetsPlugin 更新為 CssMinimizerPlugin 並改在 optimization使用
    minimizer: [new CssMinimizerPlugin()],
    //若沒有設定則只會在生產環境中壓縮
    minimize: true,
  },
};
