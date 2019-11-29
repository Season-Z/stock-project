const resCode = {
  1000000: '请求成功',
  1000001: '请求失败',
  1000002: '当前未登录，请重新登录',
  1000003: '密码错误',
  1000004: '服务器错误'
};

module.exports = (code, params) => ({
  code,
  message: resCode[code],
  ...params
});
