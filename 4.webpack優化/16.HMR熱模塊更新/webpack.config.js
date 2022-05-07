/*
    HMR : hot module replacement 熱模塊替換 / 模塊熱替換
    作用 : 當一個檔案發生變化就只會重新打包該檔案(而不是打包所有)
    
    樣式文件 : 可以使用HMR功能(因為style-loader內部實現)
    js文件 : 默認不能使用HMR功能 --> 需要修改代碼，添加支持HMR功能的代碼
    注意 : HMR功能對JS處理，只能處理非入口文件的其他文件
    html文件 : 默認不能使用HMR功能，同時會導致問題(html不能熱更新)
    注意 : HTML實踐上不應該使用熱替換，在單頁面的情況下
    解決 : 修改entry入口，將html文件引入
*/

const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.js", "./src/index.html"],
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
    //開啟HMR
    hot: true,
  },
};
