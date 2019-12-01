const express = require('express');
const User = require('../models/User');
const { createToken } = require('../utils/token');

const router = express.Router();

router.get('/info', async function(req, res) {
  if (req.session) {
    const { username } = req.session;
    const { role } = await User.findOne({ username });
    res.status(200).json({ success: true, message: '请求成功', data: { username, role } });
  } else {
    res.json(500).json({ success: false, message: '服务器出错' });
  }
});

router.post('/register', async function(req, res) {
  const { username, password, role } = req.body;

  try {
    const isExit = await User.findOne({ username });
    if (isExit) {
      res.status(200).json({ success: false, message: '用户名已存在' });
      return;
    }

    const user = new User({ username, password, role });
    await user.save();

    res.status(200).json({ success: true, message: '新增用户成功' });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: '服务器出错' });
  }
});

router.post('/login', async function(req, res) {
  const { username, password } = req.body;

  try {
    const result = await User.findOne({ username, password });

    if (!result) {
      res.status(200).json({ success: false, message: '用户名或密码错误' });
      return;
    }

    const token = createToken({ username, password });
    res.status(200).json({ success: true, message: '登录成功', token });
  } catch (error) {
    console.log(error);
    res.json(500).json({ success: false, message: '服务器出错' });
  }
});

module.exports = router;
