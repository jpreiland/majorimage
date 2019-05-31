const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  f_type: String
})

module.exports = mongoose.model('Item', itemSchema);