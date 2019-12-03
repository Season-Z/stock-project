const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
  {
    isStorage: {
      type: Boolean,
      default: true,
    },
    username: String,
    productName: String,
    productCount: Number,
    count: Number,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
