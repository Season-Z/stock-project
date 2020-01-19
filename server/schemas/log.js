const { Schema } = require('mongoose');

module.exports = new Schema(
  {
    isStorage: {
      type: Boolean,
      default: true,
    },
    username: String,
    client: String,
    count: Number,
    products: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
