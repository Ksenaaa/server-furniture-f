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
        img: item.pictures.img1.img
      }))

      res.json(manyNews)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

module.exports = router
