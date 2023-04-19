const { Router } = require('express') 
const router = Router()
const testimonialsModel = require('../models/testimonials')
const quantityElementsToDisplay = require('../utils/constants/quantityElementsToDisplay')
const lastItems = require('../utils/lastItems')
const paginationByElement = require('../utils/paginationByElement')

router.get(
  '/main-testimonials',
  async (req, res) => {
    try {
      const { dataModel } = await lastItems(testimonialsModel, quantityElementsToDisplay)

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

      const { dataModel, totalPages, currentPage } = await paginationByElement({ 
        Model: testimonialsModel, 
        page, 
        limit 
      })

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
