import storage from '@/utils/storage';

// eslint-disable-next-line
export const ROLE_MENU = {
  '/home': [1, 2, 3],
  '/createProduct': [1, 2],
  '/homeEnd': [1],
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
