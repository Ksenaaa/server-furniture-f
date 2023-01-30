const { Router } = require('express') 
const router = Router()
const mainCatalogModel = require('../models/mainCatalog')

router.get(
  '/',
  async (req, res) => {
    try {
      let findCatalog = await mainCatalogModel.find()
      
      let mainCatalog = await findCatalog.map(item => ({
        id: item._id,
        name: item.name,
        img: item.img
      }))
      
      res.json(mainCatalog)
    } catch (e) {
      res.status(500).json({ message: "its Error, try again!" })
    }
  }
)

module.exports = router
