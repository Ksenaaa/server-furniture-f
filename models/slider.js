const mongoose = require('mongoose')

const imageSliderSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model('sliderImage', imageSliderSchema);
