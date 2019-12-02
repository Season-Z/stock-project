const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');

const router = express.Router();
const uploadImg = multer({ dest: 'img/' });

router.post('/upload', uploadImg.single('avatar'), function(req, res) {
  const { path, filename } = req.file;
  res
    .status(200)
    .json({ success: true, message: '上传成功', data: { imgUrl: path, imgId: filename } });
});

router.post('/save', async function(req, res) {
  const { _id, productName, ...rest } = req.body;
  try {
    if (_id) {
      // 编辑请求
      const result = await Product.findByIdAndUpdate({ _id }, { productName, ...rest });
      console.log(result);
      res.status(200).json({ success: true, message: '更新产品成功' });

      return;
    }

    const isExit = await Product.findOne({ productName });
    if (isExit) {
      res.status(200).json({ success: false, message: '该产品名称已存在' });
      return;
    }

    const product = new Product(req.body);
    await product.save();

    res.status(200).json({ success: true, message: '新增产品成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

router.get('/list', async function(req, res) {
  const { pageNo: page, pageSize: size, search } = req.query;
  const pageNo = +page || 1;
  const pageSize = +size || 2;
  const skip = (+pageNo - 1) * pageSize;

  try {
    const searchParams = {
      $or: [
        { productName: { $regex: search, $options: '$i' } },
        { productType: { $regex: search, $options: '$i' } },
      ],
    };

    const count = await Product.countDocuments(searchParams);
    const list = await Product.find(searchParams)
      .limit(+pageSize)
      .skip(skip)
      .sort({ _id: -1 })
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

router.delete('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    await Product.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: '删除成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

module.exports = router;
