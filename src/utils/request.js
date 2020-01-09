import axios from 'axios';
import { message, notification } from 'antd';
import storage from '@/utils/storage';

const resCode = {
  10000: '请重新登录',
  1000002: '当前未登录，请重新登录',
  1000003: '密码错误',
  1000005: '该用户未激活，无法登陆',
};

const instance = axios.create({
  timeout: 25000,
  withCredentials: true,
  // baseURL: BASE_URL,
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
    const { success, message, code, userInfo } = response.data;
    if (!success) {
      notification.error({
        message: '请求错误',
        description: (code && resCode[code]) || message,
      });
      if (code === 10000) {
        setTimeout(() => window.location.replace('/login'), 500);
      }

      return Promise.reject(response.data);
    }

    if (userInfo && Object.keys(userInfo).length) {
      storage.setItem('userInfo', userInfo);
    }

    return response.data;
  },
  err => {
    const msg = err.response ? err.response.data.message : '';

    notification.error({
      message: '接口请求失败',
      description: msg || '服务器出了点小问题，请稍后再试！',
    });

    return Promise.reject(err);
  },
);

export default instance;
