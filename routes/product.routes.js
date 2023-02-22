const { Router } = require('express') 
const router = Router()
const productModel = require('../models/product')
const lastItem = require('../utils/lastItem')
const pagination = require('../utils/pagination')

router.get(
  '/new',
  async (req, res) => {
    try {
      const { dataModel } = await lastItem(productModel, 6)

      let products = await dataModel.map(item => ({
        id: item._id,
        name: item.name,
        code: item.code,
        category: item.category,
        price: item.quality.standart,
        colors: item.colors,
        img: item.imgs[0]
      }))

      res.json(products)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

router.get(
  '/category/:category',
  async (req, res) => {
    try {
      const { category } = req.params
      const { page, limit } = req.query

      const { dataModel, totalPages, currentPage } = await pagination({ 
        Model: productModel, 
        category, 
        type: '', 
        page, 
        limit 
      })

      let pageData = await dataModel.map(item => ({
        id: item._id,
        name: item.name,
        code: item.code,
        category: item.category,
        price: item.quality.standart,
        colors: item.colors,
        img: item.imgs[0]
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

router.get(
  '/type/:type',
  async (req, res) => {
    try {
      const { type } = req.params
      const { page, limit } = req.query

      const { dataModel, totalPages, currentPage } = await pagination({ 
        Model: productModel, 
        category: '', 
        type, 
        page, 
        limit 
      })

      const pageData = await dataModel.map(item => ({
        id: item._id,
        name: item.name,
        code: item.code,
        category: item.category,
        price: item.quality.standart,
        colors: item.colors,
        img: item.imgs[0]
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

router.get(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params

      let findProduct = await productModel.find({ _id: id })

      let product = await findProduct.map(item => ({
        id: item._id,
        name: item.name,
        code: item.code,
        category: item.category,
        type: item.type,
        popularity: item.popularity,
        quality: item.quality,
        colors: item.colors,
        characteristics: item.characteristics,
        imgs: item.imgs,
        about: item.about
      }))

      res.json(product[0])
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

module.exports = router
