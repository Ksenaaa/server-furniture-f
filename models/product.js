const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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

productSchema.plugin(mongoosePaginate)

module.exports = new mongoose.model('product', productSchema)
