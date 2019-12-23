// ref: https://umijs.org/config/
const routes = require('./src/routers');

export default {
  treeShaking: true,
  routes: [
    { path: '/', redirect: '/stock' },
    {
      path: '/home',
      component: '../pages/Home',
    },
    {
      path: '/login',
      component: '../pages/Login',
    },
    {
      path: '/',
      component: '../layouts/index',
      routes: routes,
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '库存',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      changeOrigin: true,
    },
  },
};
