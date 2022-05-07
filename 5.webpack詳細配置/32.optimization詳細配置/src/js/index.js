import(/* webpackChunkName: a */ "./add")
  .then({ default: a }, () => {
    a(1, 2);
  })
  .catch((e) => {
    console.log(e);
  });
