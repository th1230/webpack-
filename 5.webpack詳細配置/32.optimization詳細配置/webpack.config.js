const { resolve } = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "dist"),
    chunkFilename: "js/[name].[contenthash:10].js",
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
  optimization: {
    splitChunks: {
      chunks: "all",
      //默認值可以不寫
      // minSize: 30 * 1024, //分割的chunk最小要30kb
      // maxSize: 0, //最大沒有限制
      // minChunks: 1, //最小要被引用的次數
      // maxAsyncRequests: 5, // 按需加載並行加載的最大數量
      // maxInitialRequests: 3, // 入口js文件最大並行請求數量
      // automaticNameDelimiter: "~", //名稱連接符
      // name: true, //可使用命名規則
      // cacheGroups: {
      //   // node_modules文建會被打包到vendors組的chunk中。 vendor~xxx.js
      //   //滿足上面的公共規則 例如 大小超過30kb
      //   vendor: {
      //     test: /[\\/]node_modules[\\/]/,
      //     //設定優先及
      //     priority: -10,
      //   },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     //如果當前打包的模塊，和之前打包的模塊是同一個的話，就會複用，而不是重新打包
      //     reuseExistingChunk: true,
      //   },
      // },
    },
    //將當前模塊紀錄得其他模塊的hash值提取出來成為單獨的runtime文件
    //解決 : a文件修改導致b文件的contenthash值發生變化
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    minimizer: [
      //配置生產環境壓縮js與css的壓縮方案
      new TerserPlugin({
        //開啟多進成打包
        parallel: true,
      }),
    ],
  },
  plugins: [new HtmlWepackPlugin()],
  mode: "development",
};
