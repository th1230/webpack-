// import "@babel/polyfill";

const add = (a, b) => {
  return a + b;
};

// let arr = [1, 2, [3, 4], 5];

// arr.flat();

console.log(add(1, 2));

let p = new Promise((res, rej) => {
  setTimeout(() => {
    console.log(123);
  }, 1000);
});

console.log(p);
