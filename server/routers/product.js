const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Log = require('../models/Log');

const router = express.Router();
const uploadImg = multer({ dest: 'img/' });

router.post('/upload', uploadImg.single('avatar'), function(req, res) {
  const { path, filename } = req.file;
  res
    .status(200)
    .json({ success: true, message: '上传成功', data: { imgUrl: path, imgId: filename } });
});

router.post('/save', async function(req, res) {
  const { _id, productName, type, ...rest } = req.body;
  const { username } = req.session;
  try {
    if (_id) {
      if (!type) {
        // 编辑请求
        await Product.findByIdAndUpdate({ _id }, { productName, ...rest });
        res.status(200).json({ success: true, message: '更新产品成功' });

        return;
      }

      if (type === 'delivery' && +rest.productCount < +rest.count) {
        throw '出库的数量不能超过库存数量';
      }

      const isStorage = type === 'storage';
      const count = isStorage ? rest.productCount + rest.count : rest.productCount - rest.count;
      await Product.findByIdAndUpdate({ _id }, { productCount: count });

      const log = new Log({
        username,
        productName,
        productCount: count,
        count: rest.count,
        isStorage,
      });
      await log.save();

      res.status(200).json({ success: true, message: '更新产品成功' });

      return;
    }

    const isExit = await Product.findOne({ productName });
    if (isExit) {
      res.status(200).json({ success: false, message: '该产品名称已存在' });
      return;
    }
    // 新增产品
    const product = new Product({ ...req.body, username });
    await product.save();

    res.status(200).json({ success: true, message: '新增产品成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error || '服务器出错' });
  }
});

router.get('/list', async function(req, res) {
  const { pageNo: page, pageSize: size, search, username } = req.query;
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
    if (username) {
      searchParams.username = username;
    }

    const count = await Product.countDocuments(searchParams);
    const list = await Product.find(searchParams)
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

router.delete('/:id', async function(req, res) {
  const { id } = req.params;

  try {
    const { imageId, productName } = await Product.findById({ _id: id });

    fs.unlink(path.join('img/', imageId), function(err) {
      if (err) {
        throw '删除图片出错：' + err;
      }
    });

    await Product.deleteOne({ _id: id });
    await Log.deleteMany({ productName });
    res.status(200).json({ success: true, message: '删除成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

module.exports = router;