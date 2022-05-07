/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
function add(a, b) {
  return a + b;
} // eslint-disable-next-line


console.log(add(1, 2));
/*
    1. eslint不認識window navigator等全局變量
       解決 : 需修改package.json中eslintConfig配置
       "env":{
       "browser":true //支持瀏覽器變量
       }

    2.serviceWorker必須在伺服器上面運行
    可使用:
    nodeJs
    npm i serve -g
    serve -s dist 啟動伺服器，將dist資料夾下的內容暴路出去
*/
// 註冊serviceWorker
// 處理兼容性問題

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
      // eslint-disable-next-line
      console.log("註冊成功");
    }).catch(() => {
      // eslint-disable-next-line
      console.log(":註冊失敗");
    });
  });
}
/******/ })()
;