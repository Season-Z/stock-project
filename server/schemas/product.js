const { Schema } = require('mongoose');

module.exports = new Schema(
  {
    imageUrl: String,
    productType: {
      type: String,
      required: [true, '产品类型是必须的'],
    },
    productName: {
      type: String,
      required: [true, '产品名称是必须的'],
      unique: true,
      trim: true,
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
    username: {
      type: String,
      required: [true, '用户名是必须的'],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
