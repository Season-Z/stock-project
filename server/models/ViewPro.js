const mongoose = require('mongoose');
const ViewProSchema = require('../schemas/viewPro');

module.exports = mongoose.model('ViewPro', ViewProSchema);
