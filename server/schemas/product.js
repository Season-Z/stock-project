const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    imageId: String,
    imageUrl: String,
    productType: {
      type: String,
      required: [true, '产品类型是必须的'],
    },
    productName: {
      type: String,
      required: [true, '产品名称是必须的'],
    },
    productMemo: String,
    productCount: {
      type: Number,
      default: 0,
    },
    isStorage: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
