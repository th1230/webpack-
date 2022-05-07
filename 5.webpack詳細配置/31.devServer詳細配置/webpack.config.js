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
  resolve: {
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    extensions: [".js"],
    modules: [resolve(__dirname, "../../node_modules")],
  },
  devServer: {
    //運行代碼的目錄
    contentBase: resolve(__dirname, "dist"),
    //監視contentBase底下目錄的所有文件，一旦文件發生變化就會reload
    watchContentBase: true,
    watchOptions: {
      //忽略文件
      ignored: "/node_modules/",
    },
    //啟動gzip壓縮
    compress: true,
    //端口號
    port: 5000,
    //域名
    host: "localhost",
    //自動打開瀏覽器
    open: true,
    //開啟HMR
    hot: true,
    //不要顯示伺服器日誌
    clientLogLevel: "none",
    //除基本訊息其他都不顯示
    quiet: true,
    //如果出錯不要全屏顯示
    overlay: false,
    //服務器代理
    proxy: {
      //一旦devServer接收到/api/xxx的請求，就會轉發到另一個服務器3000
      "/api": {
        target: "http://localhost:3000",
        //發送請求時路徑重寫 -> 將/api/xxx --> /xxx (去掉/api)
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  plugins: [new HtmlWepackPlugin()],
  mode: "development",
};
