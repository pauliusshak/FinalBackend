const regSchema = require('../schemas/regSchema')
const themeSchema = require("../schemas/themeSchema")
const commentSchema = require("../schemas/commentSchema")
const bcrypt = require("bcrypt")

module.exports = {
    register: async (req, res) => {
        const {username, pass1, photo} = req.body
        const hash = await bcrypt.hash(pass1, 10)
        const regUser = new regSchema()
        regUser.username = username
        regUser.pass1 = hash
        regUser.photo = photo
        regUser.save().then(() => {
            res.send({success: true})
        })
    },
    login: async (req, res) => {
        const {username, pass1} = req.body
        const myUser = await regSchema.findOne({username})
        const compareResult = await bcrypt.compare(pass1, myUser.pass1)
        if (compareResult) {
            return res.send({success: true, myUser})
        }
    },
    createTheme: async (req, res) => {
        const {theme, category, creator, comments} = req.body
        const newTheme = new themeSchema()
        newTheme.theme = theme
        newTheme.category = category
        newTheme.creator = creator
        newTheme.save().then(() => {
            res.send({success: true, newTheme})
        })
    },
    addPhoto: async (req, res) => {
        const {newPhoto, username} = req.body
        regSchema.findOneAndUpdate({username: username}, {photo: newPhoto}, (error, data) => {
            if (error) {
                console.log(error)
            }
        })
        res.send({username, newPhoto})
    },
    addComment: async (req, res) => {
        const {comment, username, date, topic} = req.body
        const newComment = new commentSchema()
        newComment.comment = comment
        newComment.username = username
        newComment.date = date
        newComment.topic = topic
        const myUser = await regSchema.findOne({username})
        newComment.photo = myUser.photo
        newComment.save().then(() => {
            res.send({success: true, newComment})
        })
    },
    updatePhoto: async (req, res) => {
        const {username, newPhoto} = req.body
        commentSchema.findOneAndUpdate({username: username}, {photo: newPhoto}, (error, data) => {
            if (error) {
                console.log(error)
            }
        })
        const myUser = await regSchema.findOne({username})
        return res.send({success: true, myUser})
    },
    updateCommentPhotos: async (req, res) => {
        const {username, newPhoto, topic} = req.body
        commentSchema.updateMany({username}, {photo: newPhoto}, (error, data) => {
            if (error) {
                console.log(error)
            }
            commentSchema.find({topic: topic}).then((comments => res.send({success: true, comments})))
        })
    },
    loadComments: async (req, res) => {
        const {topic} = req.body
        const comments = await commentSchema.find({topic: topic})
        res.send({comments})
    },
    sendInfo: async (req, res) => {
        const {username} = req.body
        const comments = await commentSchema.find({username: username})
        const themes = await themeSchema.find({creator: username})
        res.send({comments, themes})
    },
    searchTopic: async (req, res) => {
        const {topic} = req.body
        const searchTopic = await themeSchema.find({theme: topic})
        res.send({searchTopic})
    },
    searchCategory: async (req, res) => {
        const {category} = req.body
        const searchTopic = await themeSchema.find({category: category})
        res.send({searchTopic})
    },
    searchByCreator: async (req, res) => {
        const {creator} = req.body
        const searchTopic = await themeSchema.find({creator: creator})
        res.send({searchTopic})
    },
    getCategoryProducts: async (req, res) => {
        const {theme, page, itemsInPage} = req.body;
        const items = await themeSchema.count({});
        const totalPages = Math.ceil(items / itemsInPage);
        const posts = await themeSchema.find({}).skip(Math.ceil(itemsInPage * (page - 1))).limit(Math.ceil(itemsInPage))
        res.send({success: true, pagedPosts: posts, totalPages: totalPages})
    },
    loadThemes: async (req, res) => {
        const {user} = req.body
        const themes = await themeSchema.find()
        res.send({themes, user})
    }
}