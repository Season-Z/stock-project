const express = require('express');
const Log = require('../models/Log');
const { handleParams } = require('../utils/handler');

const router = express.Router();

router.get('/list', async function(req, res) {
  const { pageNo: page, pageSize: size, startTime, endTime, ...rest } = req.query;

  try {
    const pageNo = +page || 1;
    const pageSize = +size || 10;
    const skip = (+pageNo - 1) * pageSize;

    const values = handleParams(rest);
    if (startTime && endTime) {
      values.createdAt = {
        $gte: startTime,
        $lt: endTime,
      };
    }

    const count = await Log.countDocuments(values);
    const list = await Log.find(values)
      .populate('products', ['productName', 'productCount'])
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
