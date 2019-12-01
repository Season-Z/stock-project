import axios from 'axios';
import { message, notification } from 'antd';
import storage from '@/utils/storage';
// import store from '@/redux';
// import { userLoginOut } from '@/redux/user/action';

const resCode = {
  10000: '请重新登录',
  1000002: '当前未登录，请重新登录',
  1000003: '密码错误',
  1000005: '该用户未激活，无法登陆',
};

const instance = axios.create({
  timeout: 25000,
  withCredentials: true,
  // baseURL: 'http://127.0.0.1:4000'
});

instance.interceptors.request.use(
  config => {
    const token = storage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
    }

    return config;
  },
  err => {
    message.error('bad request');
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  response => {
    const { success, message, code } = response.data;
    if (!success) {
      notification.error({
        message: '请求错误',
        description: (code && resCode[code]) || message,
      });
      if (code == 10000) {
        setTimeout(() => window.location.replace('/login'), 500);
      }

      return Promise.reject(response.data);
    }

    return response.data;
  },
  err => {
    console.log(err);
    notification.error({
      message: '接口请求失败',
      description: '服务器出了点小问题，请稍后再试！',
    });

    return Promise.reject(err);
  },
);

export default instance;
