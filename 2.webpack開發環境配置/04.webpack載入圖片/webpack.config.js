const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
    //設定圖片輸出的資料夾以及檔案名稱
    assetModuleFilename: "asset/[hash:8][ext]",
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/inline",
        //當檔案小於4kb時會轉換圖片為base64格式的字符串
        //優點 : 減少請求數(減輕伺服器壓力)
        //缺點 : 圖片請求大(文件請求速度慢)
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },

      {
        test: /\.html$/i,
        //處理html檔案中的img，處理後轉交給 資源模塊(asset module) 去處理
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
