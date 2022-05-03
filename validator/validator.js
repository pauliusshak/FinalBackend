const regSchema = require('../schemas/regSchema')
const themeSchema = require("../schemas/themeSchema")
module.exports = {
    validateReg: async (req, res, next) => {
        const {username, pass1, pass2,photo} = req.body
        const findUsername = await regSchema.findOne({username})
        if (findUsername) return res.send({success: false, error: 'User with this username already exists'})
        if (username.length < 4) return res.send({success: false, error: "Username can`t be shorter than 4 characters"})
        if (username.length > 20) return res.send({success: false, error: "Username can`t be longer than 20 characters"})
        if (pass1.length > 20) return res.send({success: false, error: "Pass can`t be longer than 20 characters"})
        if (pass1.length < 4) return res.send({success: false, error: "Password can`t be shorter than 4 characters"})
        if (pass2 !== pass1) return res.send({success: false, error: "Passwords don`t match"})
        next()
    },
    validateLog: async (req, res, next) => {
        const {username, pass1} = req.body
        const user = await regSchema.findOne({username})
        if (!(!!user)) return res.send({success: false, error: 'No user with this username was found'})
        if (username.length < 4) return res.send({success: false, error: "Username can`t be shorter than 4 characters"})
        if (username.length > 20) return res.send({success: false, error: "Username can`t be longer than 20 characters"})
        if (pass1.length > 20) return res.send({success: false, error: "Pass can`t be longer than 20 characters"})
        if (pass1.length < 4) return res.send({success: false, error: "Password can`t be shorter than 4 characters"})
        next()
    },
    validateTheme: async (req,res,next)=>{
        const {theme,category}=req.body
        const findTheme = await themeSchema.findOne({theme})
        if (findTheme) return res.send({success: false, error: 'Theme with this title already exists'})
        if (theme.length < 4) return res.send({success: false, error: "Theme title can`t be shorter than 4 characters"})
        if (theme.length > 30) return res.send({success: false, error: "Theme title can`t be longer than 20 characters"})
        if (category.length < 4) return res.send({success: false, error: "Category title can`t be shorter than 4 characters"})
        if (category.length > 20) return res.send({success: false, error: "Category title can`t be longer than 20 characters"})
        next()
    },
    validatePhoto:async (req,res,next)=>{
        const {newPhoto}= req.body
        if(newPhoto.length <1 ) return res.send({success:false, error: "Please add photo URL"})
        if(!newPhoto.startsWith("http")) return res.send({success:false, error: "Please add a valid photo link (should start with HTTP)"})
        next()
    },
    commentValidate:async (req,res,next)=>{
        const {comment}= req.body
        if(comment.length <1 ) return res.send({success:false, error: "Comment can`t be shorter than 5 characters"})
        if(comment.length >500 ) return res.send({success:false, error: "Comment can`t be longer than 500 characters"})
        next()
    }
}