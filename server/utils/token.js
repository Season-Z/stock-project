const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./config');

/**
 * 创建 token
 */
exports.createToken = obj => {
  return jwt.sign(obj, SECRET_KEY, {
    expiresIn: 60 * 60 * 3 // 3小时过期
  });
};

/**
 * 校验 token
 */
exports.checkToken = token => {
  let bool = true;

  try {
    bool = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    bool = false;
  }

  return bool;
};
