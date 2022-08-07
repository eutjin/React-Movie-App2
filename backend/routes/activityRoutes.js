const express =require('express')
const router= express.Router()
const {registerUser, loginUser, getMe}= require('../controllers/userController')

const {protect}= require('../middleware/authMiddleware')
const Comment= require('../models/commentModel')
const UserAction= require('../models/userActionModel')



//solution before current V2 solution (with mongoose refPath + additional userAction model)
router.post('/getAllUserComments', (req, res)=>{
console.log(req.body)
    Comment.find({'writer': req.body.user}).populate('writer').exec((err, result)=>{
        if(err) return res.status(400).send(err)
        console.log("time", result)
        res.status(200).json({success: true, result})
    })

    })

    //v2 solution,
    router.post('/getAllActions', (req, res)=>{
        console.log(req.body)
            UserAction.find({'user': req.body.user}).populate('user').populate('componentId').exec((err, result)=>{
                if(err) return res.status(400).send(err)
                console.log("time", result)
                res.status(200).json({success: true, result})
            })
        
            })



 

module.exports= router