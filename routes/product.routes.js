const { Router } = require('express') 
const router = Router()
const productModel = require('../models/product')
const colorsModel = require('../models/color')
const lastItems = require('../utils/lastItems')
const paginationByElement = require('../utils/paginationByElement')
const paginationProductsList = require('../utils/paginationProductsList')
const productsCursor = require('../utils/productsCursor')
const quantityElementsToDisplay = require('../utils/constants/quantityElementsToDisplay')

router.get(
  '/new',
  async (req, res) => {
    try {
      const { dataModel } = await lastItems(productModel, quantityElementsToDisplay)

      const { products } = await productsCursor(dataModel)

      res.json(products)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

router.get(
  '/list/:category',
  async (req, res) => {
    try {
      const { category } = req.params
      const { page, limit, filter, sort } = req.query

      const { productsData, totalPages, currentPage, filterData } = await paginationProductsList({ 
        Products: productModel, 
        Colors: colorsModel, 
        category, 
        page, 
        limit,
        filter,
        sort
      })

      const { products } = await productsCursor(productsData)

      res.json({
        pageData: products,
        totalPages,
        currentPage,
        filterData
      })
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

router.get(
  '/:element/:elementName',
  async (req, res) => {
    try {
      const { element, elementName } = req.params
      const { page, limit } = req.query

      const { dataModel, totalPages, currentPage } = await paginationByElement({ 
        Model: productModel, 
        element,
        elementName, 
        page, 
        limit 
      })

      const { products } = await productsCursor(dataModel)

      res.json({
        pageData: products,
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
