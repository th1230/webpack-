/*
    webpack 開發環境配置 
    1. 對樣式引入的處理
    2. 對圖片資源引入的處理
    3. 對html圖片引入處理
    4. html自動化生成並引入相應的資源
    5. 設定devServer伺服器提高開發效率
    6. 對其他資源格式的處理(icon)
*/

const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",

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
};
