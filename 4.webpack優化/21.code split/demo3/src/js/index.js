function sayhello() {
  console.log("hello");
}

sayhello();

/* 
  通過js代碼引入，讓某個文件單獨被打包成一個chunk
  import動態導入語法 : 能將某個文件單獨打包
*/

import(/* webpackChunkName:'test' */ "./add")
  .then(({ add, mul }) => {
    add(1, 2);
  })
  .catch((e) => {
    console.log("文件加載失敗");
  });
