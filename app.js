const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fs = require('fs')
const { Img } = require('./models/img')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.dfuhn.mongodb.net/imgUploader?retryWrites=true&w=majority'

app.use(express.static('public'))
app.use(bodyParser.urlencoded())

mongoose.connect(dbURI).then((result) => {
    app.listen(3000, () => {
        console.log('Server Running')
    })
})

app.get('/', (req, res) => {
    res.sendFile('./public/HTML/index.html', { root: __dirname })
})

app.post('/upload', upload.single('imgInput'), (req, res, next) => {
    const imgName = req.originalname
    const filePath = req.file.destination + '/' + req.file.filename

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err.message)
        } else {
            Img.deleteMany().then(result => {
                const newImg = new Img({
                    data: data,
                    name: req.file.originalname
                })

                newImg.save().then((result) => {
                    console.log('Img Saved')
                    res.sendFile('./public/HTML/uploaded.html', { root: __dirname })
                }).catch(err => console.log(err.message))
            }).catch(err => console.log(err.message))
        }
    })
})