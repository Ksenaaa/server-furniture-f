const { Router } = require('express') 
const router = Router()
const newsModel = require('../models/news')

router.get(
  '/main-news',
  async (req, res) => {
    try {
      let findNews = await newsModel.find()
      
      let manyNews = await findNews.map(item => ({
        id: item._id,
        name: item.name,
        img: item.pictures[0]
      }))

      res.json(manyNews.slice(-3))
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
      
      let manyNews = await findNews.map(item => ({
        id: item._id,
        name: item.name,
        img: item.pictures[0]
      }))

      res.json(manyNews)
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
