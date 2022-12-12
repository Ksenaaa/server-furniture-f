const { Router } = require('express') 
const fs = require('fs')
const path = require('path') 
const router = Router()
const imgModel = require('../models/slider')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + req.body.name + '-' + Date.now())
    }
})
 
const upload = multer({ storage: storage })
  
router.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err)
            res.status(500).send('An error occurred', err)
        } else {
            res.render('imagesPage', { items: items })
        }
    })
})

router.post('/create-image', upload.single('image'), (req, res, next) => {
    const obj = {
        name: req.body.name,
        img: {
            data: fs.readFileSync(path.join(__dirname, '..' + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})

module.exports = router
