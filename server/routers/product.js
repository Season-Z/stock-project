const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Log = require('../models/Log');

const router = express.Router();
const uploadImg = multer({ dest: 'img/' });

router.post('/upload', uploadImg.single('avatar'), (req, res) => {
  const { path, filename } = req.file;
  res
    .status(200)
    .json({ success: true, message: '上传成功', data: { imgUrl: path, imgId: filename } });
});

router.post('/save', async (req, res) => {
  const { _id, productName, type, ...rest } = req.body;
  const { username, role } = req.session;
  try {
    if (_id) {
      let isStorage = type === 'storage';
      let { count } = rest;
      let totalCount = rest.productCount;
      let canLog = true;

      if (!type) {
        // 编辑请求
        const result = await Product.findById({ _id });
        // 判断当前是入库还是出库。大于0为入库，小于0为出库，等于0为入库人员的编辑操作
        const num = rest.productCount - result.productCount;
        isStorage = num > 0 && num !== 0;
        // 编辑操作 不记录
        canLog = !(num === 0);

        // 获取变化的产品数量
        count = Math.abs(rest.productCount - result.productCount);

        await Product.findByIdAndUpdate({ _id }, { productName, ...rest });
        res.status(200).json({ success: true, message: '更新产品成功' });
      } else {
        // 入库、出库
        if (type === 'delivery' && +rest.productCount < +rest.count) {
          throw '出库的数量不能超过库存数量';
        }

        totalCount = isStorage ? rest.productCount + rest.count : rest.productCount - rest.count;
        await Product.findByIdAndUpdate({ _id }, { productCount: totalCount });
      }

      if (canLog) {
        const log = new Log({
          username,
          count,
          isStorage,
          products: _id,
        });
        await log.save();
      }

      res.status(200).json({ success: true, message: '更新产品成功' });
      return;
    }

    // 新增产品
    const isExit = await Product.findOne({ productName });
    if (isExit) {
      res.status(200).json({ success: false, message: '该产品名称已存在' });
      return;
    }
    // 新增产品
    const product = new Product({ ...req.body, username });
    await product.save();

    // 图片移动与删除
    fs.readdir('img/', function(err, paths) {
      if (err) {
        throw err;
      }

      paths.forEach(function(path) {
        if (path === req.body.imageId) {
          const readable = fs.createReadStream(`img/${path}`);
          const writeable = fs.createWriteStream(`images/${path}`);
          readable.pipe(writeable);
        }
        fs.unlinkSync(`img/${path}`);
      });
    });

    res.status(200).json({ success: true, message: '新增产品成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error || '服务器出错' });
  }
});

router.get('/list', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { imageId } = await Product.findById({ _id: id });

    fs.unlink(path.join('images/', imageId), err => {
      if (err) {
        console.log(`删除图片出错：${err}`);
      }
    });

    await Product.deleteOne({ _id: id });
    await Log.deleteMany({ products: id });
    res.status(200).json({ success: true, message: '删除成功' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || '服务器出错' });
  }
});

module.exports = router;
