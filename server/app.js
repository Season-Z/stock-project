const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const auth = require('./middleware/auth');
const userRouter = require('./routers/user');
const productRouter = require('./routers/product');
const logRouter = require('./routers/log');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '2100000kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
// token等拦截
app.use(auth);

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/log', logRouter);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb://47.110.66.228:27017/stock',
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.error(`数据库连接错误：${err}`);
    } else {
      app.listen(4000, () => {
        console.log('数据库连接成功, listened: 4000');
      });
    }
  },
);
