const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: '首页',
    icon: 'home',
    component: '../pages/Home',
  },
  {
    path: '/storage',
    name: '产品入库',
    icon: 'home',
    component: '../pages/Storage',
  },
  {
    path: '/delivery ',
    name: '产品出库',
    icon: 'home',
    component: '../pages/Delivery',
  },
  {
    path: '/stock',
    name: '产品库存',
    icon: 'home',
    component: '../pages/Stock',
  },
  {
    path: '/operatingLog',
    name: '操作记录',
    icon: 'home',
    component: '../pages/OperatingLog',
  },
];

module.exports = routes;
