const mongoose = require('mongoose')

const testimonialsSchema = new mongoose.Schema({
  id: String,
  date: Date,
  name: String,
  text: String,
  stars: Number
})

module.exports = new mongoose.model('testimonialse', testimonialsSchema)
