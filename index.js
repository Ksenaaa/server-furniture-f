const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')
 
const app = express()

app.use(cors())
app.use(express.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', require('./routes/addImgSlider.routes'))
app.use('/slider', require('./routes/getImgSlider.routes'))
 
app.set("view engine", "ejs")

mongoose.set('strictQuery', true)

const PORT = process.env.PORT || '3005'

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Port: ${PORT}`))
    } catch (e) {
        process.exit(1)
    }
}

start()
