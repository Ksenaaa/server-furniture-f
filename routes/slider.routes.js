const { Router } = require('express') 
const router = Router()
const sliderModel = require('../models/slider')

router.get(
  '/',
  async (req, res) => {
    try {
      let findSlider = await sliderModel.find()
      
      let slider = await findSlider.map(item => ({
        id: item._id,
        name: item.name,
        img: item.img
      }))
      
      res.json(slider)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

module.exports = router
