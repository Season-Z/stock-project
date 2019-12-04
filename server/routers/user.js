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
    res.status(500).json({ success: false, message: '服务器出错' });
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
    res.status(500).json({ success: false, message: '服务器出错' });
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
    res.status(500).json({ success: false, message: '服务器出错' });
  }
});

router.get('/list', async function(req, res) {
  try {
    const { pageNo: page, pageSize: size } = req.query;

    // 不分页查询
    if (!page || !size) {
      const result = await User.find({ role: { $ne: 1 }, type: true }, { password: 0 });
      res.status(200).json({ success: true, message: '请求成功', data: result });
      return;
    }

    const pageNo = +page || 1;
    const pageSize = +size || 2;
    const skip = (+pageNo - 1) * pageSize;

    const count = await User.countDocuments({ type: true });
    const list = await User.find({ type: true })
      .limit(+pageSize)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    const params = {
      pageNo,
      pageSize,
      count: count || 0,
      data: list,
    };

    res.status(200).json({ success: true, message: '请求成功', data: params });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

router.post('/save', async function(req, res) {
  const { id, username, ...rest } = req.body;
  try {
    if (id) {
      // 编辑时
      await User.findByIdAndUpdate({ _id: id }, { ...rest });
      return;
    }

    const { username } = req.body;

    const isExit = await User.findOne({ username });
    if (isExit) {
      res.status(200).json({ success: false, message: '用户名已存在' });
      return;
    }

    const user = new User(req.body);
    await user.save();

    res.status(200).json({ success: true, message: '请求成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

router.delete('/:id', async function(req, res) {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate({ _id: id }, { type: false });
    res.status(200).json({ success: true, message: '删除成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

module.exports = router;
