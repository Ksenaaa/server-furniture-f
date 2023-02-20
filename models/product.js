const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  code: String,
  category: String,
  type: String,
  popularity: Number,
  quality: {
    king: Number,
    queen: Number,
    twin: Number,
    standart: Number
  },
  colors: [String],
  characteristics: {
    size: {
      width: Number,
      height: Number,
      length: Number
    },
    other: String
  },
  imgs: [String],
  about: String
})

module.exports = new mongoose.model('product', productSchema)
