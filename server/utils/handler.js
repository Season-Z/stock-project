exports.handleParams = function(obj) {
  const keys = Object.keys(obj);

  return keys.reduce((prev, next) => {
    const notZero = typeof obj[next] === 'number' && obj[next] !== 0;
    if (notZero || obj[next]) {
      prev[next] = obj[next];
    }
    return prev;
  }, {});
};
