const { Router } = require('express') 
const router = Router()
const imgModel = require('../models/slider')

router.get(
    '/',
    async (req, res) => {
        try {
            let findImg = await imgModel.find()
            let imgs = await findImg.map(img => ({
                id: img.id,
                name: img.name,
                img: `data:image/jpeg;base64,${img.img.data.toString('base64')}`,
            }))
            res.json(imgs)
        } catch (e) {
            res.status(500).json({ message: "its Error, try again!" })
        }
    }
)

module.exports = router
