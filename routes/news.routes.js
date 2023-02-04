const { Router } = require('express') 
const router = Router()
const newsModel = require('../models/news')

router.get(
  '/main-news',
  async (req, res) => {
    try {
      let findNews = await newsModel.find()
      
      let lastNews = await findNews.map(item => ({
        id: item._id,
        name: item.name,
        img: item.pictures[0]
      })).slice(-3)

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
      let findNews = await newsModel.find()
      
      let allNews = await findNews.map(item => ({
        id: item._id,
        name: item.name,
        img: item.pictures[0]
      }))

      res.json(allNews)
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
