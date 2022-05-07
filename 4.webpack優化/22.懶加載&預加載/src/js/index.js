console.log("index.js被加載了");

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  /*
    懶加載 : 需要文件的時候加載
    預加載(prefetch) : 會在使用前預先加載js文件

    正常加載 vs 預加載 : 
    正常加載 : 可以認為是併行加載(同一時間加載多個檔案)
    預加載 : 等其他資源加載完畢，空閒的時候，偷偷加仔檔案
  */

  import(/* webpackChunkName:'test',webpackPrefetch:true */ "./test")
    .then(() => {
      console.log("加載文件");
    })
    .catch(() => {
      console.log("加載文件錯誤");
    });
});
