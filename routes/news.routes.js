const { Router } = require('express') 
const router = Router()
const newsModel = require('../models/news')
const lastItem = require('../utils/lastItem')
const pagination = require('../utils/pagination')

router.get(
  '/main-news',
  async (req, res) => {
    try {
      const { dataModel } = await lastItem({
        Model: newsModel, 
        category: '', 
        type: '', 
        quantity: 3
      })

      let lastNews = await dataModel.map(item => ({
        id: item._id,
        name: item.name,
        img: item.pictures[0]
      }))

      res.json(lastNews)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

router.get(
  '/all-news',
  async (req, res) => {
    try {
      const { page, limit } = req.query

      const { dataModel, totalPages, currentPage } = await pagination(newsModel, page, limit)
      
      let pageData = await dataModel.map(item => ({
        id: item._id,
        name: item.name,
        img: item.pictures[0]
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
  '/news-ids',
  async (req, res) => {
    try {
      let findIds = await newsModel.find({}, { _id : 1 })

      const newsIds = findIds.map(item => ({ id: item._id }))

      res.json(newsIds)
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

      let findOneNews = await newsModel.find({ _id: id })

      let oneNews = await findOneNews.map(item => ({
        id: item._id,
        name: item.name,
        text: item.text,
        pictures: item.pictures
      }))

      res.json(oneNews[0])
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

module.exports = router
