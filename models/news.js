const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  id: String,
  name: String,
  text: String,
  pictures: [String]
})

module.exports = new mongoose.model('new', newsSchema)
