const mongoose = require('mongoose')

const imageMainCatalogSchema = new mongoose.Schema({
  id: String,
  name: String,
  img: String
})

module.exports = new mongoose.model('mainCatalogImage', imageMainCatalogSchema)
