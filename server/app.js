const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const auth = require('./middleware/auth');
const userRouter = require('./routers/user');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// token等拦截
app.use(auth);
app.use('/api/user', userRouter);

mongoose.connect(
  'mongodb://39.98.140.218:27017/stock',
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      console.error('数据库连接错误：' + err);
    } else {
      app.listen(4000, function() {
        console.log('数据库连接成功, listened: 4000');
      });
    }
  },
);
