const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: '首页',
    icon: 'home',
    component: '../pages/Home',
  },
  {
    path: '/createProduct',
    name: '添加产品',
    icon: 'plus-circle',
    component: '../pages/CreateProduct',
  },
  {
    path: '/storage',
    name: '入库日志',
    icon: 'login',
    component: '../pages/Storage',
  },
  {
    path: '/delivery ',
    name: '出库日志',
    icon: 'logout',
    component: '../pages/Delivery',
  },
  {
    path: '/stock',
    name: '产品库存',
    icon: 'hdd',
    component: '../pages/Stock',
  },
  {
    path: '/operatingLog',
    name: '操作记录',
    icon: 'container',
    component: '../pages/OperatingLog',
  },
];

module.exports = routes;
