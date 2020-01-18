const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    imageUrl: String,
    productType: String,
    productName: {
      type: String,
      required: [true, '产品名称是必须的'],
      unique: true,
      trim: true,
    },
    productMemo: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
