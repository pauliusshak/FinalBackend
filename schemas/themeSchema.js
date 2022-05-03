const mongoose = require('mongoose')
const Schema = mongoose.Schema

const themeSchema = new Schema({
    theme: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    creator:{
        type: String,
        required:true
    }
})
module.exports = mongoose.model('themeSchema', themeSchema)