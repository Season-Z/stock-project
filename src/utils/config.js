import storage from '@/utils/storage';

// export const BASE_URL = 'http://127.0.0.1:4000';

export const ROLE_MENU = {
  '/home': [1, 2, 3],
  '/createProduct': [2],
  '/storage': [2],
  '/delivery': [3],
  '/stock': [1, 2, 3],
  '/operatingLog': [1],
  '/user': [1],
};

export const getUserInfo = () => {
  const userStr = storage.getItem('userInfo');
  return userStr ? JSON.parse(userStr) : {};
};

export const checkPromise = path => {
  const roles = ROLE_MENU[path];
  const { role } = getUserInfo();
  if (!roles) {
    return false;
  }
  return roles.includes(role);
};
