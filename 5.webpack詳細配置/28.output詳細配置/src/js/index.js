// import add from "./add";
import count from "./count";

// add(1, 2);
count(5, 2);

import("./add")
  .then((v) => {
    //解構並重新命名為add
    let { default: add } = v;
    add(1, 2);
  })
  .catch((e) => {
    console.log(e);
  });
