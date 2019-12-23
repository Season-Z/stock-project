exports.SECRET_KEY = 'jsonwebtoken';

exports.TOKEN_CONTEXT = ['username', '_id', 'email'];

exports.CHECK_EXCLUDES = ['/api/user/login'];

const BASE_CONFIG = {
  DATABASE: {
    main: 'mongodb://47.110.66.228:27017/stock',
    other: 'mongodb://47.110.66.228:27017/stock_other',
    default: 'mongodb://47.110.66.228:27017/stock_development',
  },
  PORT: {
    main: 4000,
    other: 4001,
    default: 4000,
  },
};
const env = process.env.NODE_ENV || 'default';

exports.DATABASE = BASE_CONFIG.DATABASE[env];
exports.PORT = BASE_CONFIG.PORT[env];
