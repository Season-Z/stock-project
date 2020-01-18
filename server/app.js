const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const auth = require('./middleware/auth');
const userRouter = require('./routers/user');
const productRouter = require('./routers/product');
const logRouter = require('./routers/log');
const viewProRouter = require('./routers/viewPro');

const { DATABASE, PORT } = require('./utils/config');

const app = express();
//配置express的静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json({ limit: '2100000kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
// token等拦截
app.use(auth);

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/log', logRouter);
app.use('/api/viewPro', viewProRouter);

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) {
    console.error(`数据库连接错误：${err}`);
  } else {
    app.listen(PORT, () => {
      console.log(`数据库连接成功, 库名:${DATABASE} listened: ${PORT}`);
    });
  }
});
