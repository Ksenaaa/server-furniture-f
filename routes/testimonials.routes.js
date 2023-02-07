const { Router } = require('express') 
const router = Router()
const testimonialsModel = require('../models/testimonials')
const lastItem = require('../utils/lastItem')
const pagination = require('../utils/pagination')

router.get(
  '/main-testimonials',
  async (req, res) => {
    try {
      const { dataModel } = await lastItem(testimonialsModel, 6)

      let testimonials = await dataModel.map(item => ({
        id: item._id,
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

router.get(
  '/testimonials',
  async (req, res) => {
    try {
      const { page, limit } = req.query

      const { dataModel, totalPages, currentPage } = await pagination(testimonialsModel, page, limit)

      let pageData = await dataModel.map(item => ({
        id: item._id,
        date: item.date,
        name: item.name,
        text: item.text,
        stars: item.stars
      }))
      
      res.json({
        pageData,
        totalPages,
        currentPage,
      })
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

module.exports = router
