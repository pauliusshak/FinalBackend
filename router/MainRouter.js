const express = require('express')
const router = express.Router()
const {validateReg, validateLog,validateTheme,validatePhoto,commentValidate} = require("../validator/validator")
const {register, login,createTheme,addPhoto,addComment,
    updatePhoto,updateCommentPhotos,loadComments,sendInfo,loadThemes,
    searchByCreator,searchTopic,searchCategory,getCategoryProducts,getCount} = require('../controller/controller')

router.post('/register', validateReg, register)
router.post('/login', validateLog, login)
router.post('/createTheme',validateTheme,createTheme)
router.post('/addPhoto',validatePhoto, addPhoto)
router.post('/addComment',commentValidate,addComment)
router.post('/updatePhoto',updatePhoto)
router.post('/updateCommentPhotos',updateCommentPhotos)
router.post('/loadComments',loadComments)
router.post('/sendInfo',sendInfo)
router.post('/searchTopic',searchTopic)
router.post('/searchCategory',searchCategory)
router.post('/searchByCreator',searchByCreator)
router.post('/getCategoryProducts',getCategoryProducts)
router.post('/loadThemes',loadThemes)
module.exports = router