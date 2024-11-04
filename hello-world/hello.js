function add(a, b) {
  return a + b;
}

exports.add1 = (a, b) => {
  return a + b;
};

module.exports = {
  addFun: add,
};
console.log(add(1, 2));
