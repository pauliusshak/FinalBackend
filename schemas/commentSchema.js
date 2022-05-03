const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    topic:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('commentSchema', commentSchema)