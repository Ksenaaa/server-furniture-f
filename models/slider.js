const mongoose = require('mongoose')

const imageSliderSchema = new mongoose.Schema({
  id: String,
  name: String,
  img: String
})

module.exports = new mongoose.model('sliderImage', imageSliderSchema)
