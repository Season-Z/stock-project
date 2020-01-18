const express = require('express');
const ViewPro = require('../models/ViewPro');

const router = express.Router();

router.post('/save', async function(req, res) {
  try {
    const viewPro = new ViewPro({ ...req.body });
    await viewPro.save();

    res.status(200).json({ success: true, message: '请求成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

router.get('/list', async function(req, res) {
  try {
    const { pageNo: page, pageSize: size } = req.query;

    const pageNo = +page || 1;
    const pageSize = +size || 10;
    const skip = (+pageNo - 1) * pageSize;

    const count = await ViewPro.countDocuments();
    const list = await ViewPro.find()
      .limit(+pageSize)
      .skip(skip)
      .sort({ updatedAt: -1 })
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
