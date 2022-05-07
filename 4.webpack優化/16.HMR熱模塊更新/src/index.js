import "../css/icofont.css";
import "../css/index.scss";
import print from "./print";

console.log("此文件被加載了");

print(123);

//讓代碼監聽module.hot是否為true，是否開啟熱模塊替換
if (module.hot) {
  //調用此方法監聽print.js文件的變化，一旦發生變化，其他默認不會重新打包
  module.hot.accept("./print.js", () => {
    //當print.js發生變化調用此回調函數
    print();
  });
}
