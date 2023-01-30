const mongoose = require('mongoose')

const ColorSchema = new mongoose.Schema({
  name: String,
  img: String,
  material: String
})

module.exports = new mongoose.model('Color', ColorSchema)
