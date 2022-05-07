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
        exclude: /\.(css|html|js|scss)$/,
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
      directory: join(__dirname, "dist"),
    },
    open: true,
    compress: true,
    port: 5000,
    hot: true,
  },

  devtool: "eval-source-map",

  /*
      source-map : 是一種提供源代碼到建構後代碼映射的技術(如果建構後代碼發生錯誤可透過映射追蹤源代碼的錯誤位置)

      [inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map

      source-map : 外部
      可顯示出源代碼的錯誤位置 和 錯誤代碼的錯誤訊息

      inline-source-map : 內聯
      可顯示出源代碼的錯誤位置 和 錯誤代碼的錯誤訊息
      指生成一個內聯source-map

      hidden-source-map : 外部
      可顯示出錯誤代碼的錯誤原因，但只能提供建構後代碼的錯誤位置

      eval-source-map : 內聯
      可顯示出源代碼的錯誤位置 和 錯誤代碼的錯誤訊息(會帶有hash值 -- 不影響)
      每個文件都生成對應的source-map

      nosource-source-map : 外部
      可顯示出錯誤代碼的錯誤原因，但沒有任何源代碼訊息

      cheap-source-map : 外部
      可顯示出源代碼的錯誤位置 和 錯誤代碼的錯誤訊息
      但只能精確到行

      cheap-module-source-map : 外部
      可顯示出源代碼的錯誤位置 和 錯誤代碼的錯誤訊息
      會將loader的source-map加入

      使用: 

      開發環境 : 速度快 、 調適更有好
      速度快 : (eval > inline > cheap ... )
      eval-cheap-source-map
      eval-source-map
      調適友好 : 
      source-map
      cheap-module-source-map
      cheap-source-map

      綜合選擇 : eval-source-map / eval-cheap-module-source-map

      生產環境 : 源代碼是否隱藏? 、 調適是否有好 
      注意 : 內聯會讓代碼體積變大，所以生產環境不使用內聯
  
      源代碼是否隱藏 : 
      hidden-source-map 只隱藏源代碼，會提示構建後代碼錯誤訊息
      nosource-source-map 全部隱藏

      調適友好 : 
      source-map
      cheap-module-source-map
      cheap-source-map

      綜合選擇 : source-map / cheap-module-source-map

  */
};
