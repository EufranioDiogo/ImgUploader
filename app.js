const express = require('express')
const app = express()

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const cloudinary = require('cloudinary')
const UPLOAD_PRESET = "xjjikdvo";
const fs = require('fs')


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./public/HTML/index.html', { root: __dirname })
})

app.post('/upload', upload.single('imgInput'), (req, res, next) => {
    fs.readdir('./uploads/', (err, files) => {
        if (err) {
            throw err;
        }

        fs.copyFile(`./uploads/${req.file.filename}`, `./uploads/${req.file.originalname}`, (err) => {
            if (err) {
                console.log(err.message)
            }

            cloudinary.v2.uploader.unsigned_upload(`./uploads/${req.file.originalname}`, UPLOAD_PRESET, { cloud_name: 'drh6wwwtw' }).then((response) => {

                for (const file of files) {
                    fs.unlink('./uploads/' + file, (error) => console.log(error))
                }

                res.render('uploaded.ejs', { imgUrl: response.url })
            }).catch((error) => console.log(error.message))
        })
    })
})

app.listen(3000, () => {
    console.log('Server Running')
})