const { Router } = require('express') 
const router = Router()
const testimonialsModel = require('../models/testimonials')

router.get(
  '/',
  async (req, res) => {
    try {
      let findTestimonials = await testimonialsModel.find()
      
      let testimonials = await findTestimonials.map(item => ({
        id: item._id,
        date: item.date,
        name: item.name,
        text: item.text,
        stars: item.stars
      }))

      res.json(testimonials)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

module.exports = router
