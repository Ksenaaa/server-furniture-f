const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  id: String,
  name: String,
  text: String,
  pictures: {
    img1: {
      img: String,
    },
    img2: {
      img: String,
    },
    img3: {
      img: String,
    }
  }
})

module.exports = new mongoose.model('new', newsSchema)
