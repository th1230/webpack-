const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
          {
            loader: "postcss-loader",

            options: {
              implementation: require("postcss"),
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

  optimization: {
    //webpack5以上已將 OptimizeCssAssetsPlugin 更新為 CssMinimizerPlugin 並改在 optimization使用
    minimizer: [new CssMinimizerPlugin()],
    //若沒有設定則只會在生產環境中壓縮
    minimize: true,
  },
};
