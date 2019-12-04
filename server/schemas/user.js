const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String, required: [true, '密码是必须的'] },
    role: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
      comment: '1-管理员，2-入库人员，3-出库人员',
    },
    type: {
      type: Boolean,
      default: true,
      comment: '是否可用',
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
