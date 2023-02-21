const { Router } = require('express') 
const router = Router()
const productModel = require('../models/product')
const lastItem = require('../utils/lastItem')

router.get(
  '/new',
  async (req, res) => {
    try {
      const { dataModel } = await lastItem({
        Model: productModel, 
        category: '', 
        type: '', 
        quantity: 6
      })

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
  '/some-category/:category',
  async (req, res) => {
    try {
      const { category } = req.params

      const { dataModel } = await lastItem({
        Model: productModel, 
        category, 
        type: '', 
        quantity: 6
      })

      let lastProductsByCategory = await dataModel.map(item => ({
        id: item._id,
        name: item.name,
        code: item.code,
        category: item.category,
        price: item.quality.standart,
        colors: item.colors,
        img: item.imgs[0]
      }))

      res.json(lastProductsByCategory)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

router.get(
  '/some-type/:type',
  async (req, res) => {
    try {
      const { type } = req.params

      const { dataModel } = await lastItem({
        Model: productModel, 
        category: '', 
        type, 
        quantity: 6
      })

      let lastProductsByType = await dataModel.map(item => ({
        id: item._id,
        name: item.name,
        code: item.code,
        category: item.category,
        price: item.quality.standart,
        colors: item.colors,
        img: item.imgs[0]
      }))

      res.json(lastProductsByType)
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
