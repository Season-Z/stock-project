const routes = [
  {
    path: '/homeEnd',
    name: '首页产品',
    icon: 'home',
    component: '../pages/HomeEnd',
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
    path: '/delivery',
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
  {
    path: '/user',
    name: '用户管理',
    icon: 'user',
    component: '../pages/User',
  },
];

module.exports = routes;
