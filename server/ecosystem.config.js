module.exports = {
  apps: [
    {
      // 环境
      name: 'main',
      // 项目启动入口文件
      script: 'app.js',

      env: {
        NODE_ENV: 'main',
      },
    },
    {
      // 环境
      name: 'other',
      // 项目启动入口文件
      script: 'app.js',

      env: {
        NODE_ENV: 'other',
      },
    },
  ],
};
