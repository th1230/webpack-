/*
   webpack.config.js 為webpack的配置文件
   作用:指示webpack做哪些事情(當運行webpack的時候會加載此檔案的內容)
   所有模塊化工具是基於nodeJs平台運行的，預設是使用commonJs格式
*/

//用來拼接絕對路徑
const { resolve } = require("path");

module.exports = {
  //入口配置
  entry: "./src/index.js",
  //輸出
  output: {
    //輸出的檔案名稱
    filename: "main.js",
    //輸出得資料夾位置(路徑)
    //__dirname代表當前文件目路的絕對路徑
    path: resolve(__dirname, "dist"),
  },
  //配置loader
  module: {
    //詳細loader配置
    rules: [
      {
        //匹配哪些文件
        test: /\.css$/,
        //使用那些loader
        use: [
          //loader執行順序由右到左，由下到上執行
          //style-loader會創建style標籤，並將js中的樣式插入，最後放到head標籤中
          "style-loader",
          //將css轉換成commonJs模塊家載到Js當中，裡面的內容式樣是字符串
          "css-loader",
        ],
      },

      {
        //匹配哪些文件
        test: /\.(scss|sass)$/,
        //使用那些loader
        use: [
          //loader執行順序由右到左，由下到上執行
          //style-loader會創建style標籤，並將js中的樣式插入，最後放到head標籤中
          "style-loader",
          //將css轉換成commonJs模塊家載到Js當中，裡面的內容式樣是字符串
          "css-loader",
          //將sass or scss檔案轉換成css檔
          "sass-loader",
        ],
      },
    ],
  },
  //配置插件
  plugins: [],
  //設置模式
  mode: "development",
  //production會進行壓縮(去除不必要的空行)
  //mode: production,
};
