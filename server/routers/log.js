const express = require('express');
const Log = require('../models/Log');

const router = express.Router();

router.get('/list', async function(req, res) {
  const { pageNo: page, pageSize: size, isStorage } = req.query;

  try {
    const pageNo = +page || 1;
    const pageSize = +size || 2;
    const skip = (+pageNo - 1) * pageSize;
    // const { username } = req.session;

    const values = isStorage === undefined ? null : { isStorage };

    const count = await Log.countDocuments(values);
    const list = await Log.find(values)
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

module.exports = router;
