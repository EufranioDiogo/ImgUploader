const mongoose = require('mongoose')
const Schema = mongoose.Schema


const img = new Schema({
    data: {
        type: Buffer,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

const Img = mongoose.model('Img', img)

module.exports = {
    Img: Img
}