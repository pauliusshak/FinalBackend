const mongoose = require('mongoose')
const Schema = mongoose.Schema

const regSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    pass1: {
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true

    }
})
module.exports = mongoose.model('regSchema', regSchema)