const express =require('express')
const router= express.Router()
const {registerUser, loginUser, getMe}= require('../controllers/userController')

const {protect}= require('../middleware/authMiddleware')
const Upvote= require('../models/upvoteModel')
const Downvote= require('../models/downvoteModel')
const UserAction= require('../models/userActionModel')


//get all UPVOTES
router.post('/getUpvotes', (req, res)=>{

    Upvote.find({'commentId': req.body.commentId}).populate('userId').exec((err, result)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true, result})
    })
})

//get all DoWNVOTES
router.post('/getDownvotes', (req, res)=>{

    Downvote.find({'commentId': req.body.commentId}).populate('userId').exec((err, result)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true, result})
    })
})

//upvote
router.post('/upvote', (req, res)=>{
    console.log('upvote',req.body)
const upvote=new Upvote(req.body)
upvote.save((err, result)=>{
    if(err) return res.json({success: false, err})
    Downvote.findOneAndDelete(req.body).exec((err, result)=>{
        return res.status(200).json({success: true, result})

    })
    console.log('result', result)
    
    //secondary action to log user action starts here
    const variable={
        user: req.body.userId,
        userAction: 'upvote',
        componentId: result._id,
        movieId: req.body.postId,
        docModel: 'Upvote',
        movieTitle: req.body.movieTitle,
    }
    const userAction= new UserAction(variable)
    userAction.save((err, result)=>{
        if(err) return res.json({success: false, err})
        
    })
})
})

//DOWNVOTE
router.post('/downvote', (req, res)=>{
    console.log('downvote',req.body)
const downvote=new Downvote(req.body)
downvote.save((err, result)=>{
    if(err) return res.json({success: false, err})
    Upvote.findOneAndDelete(req.body).exec((err, result)=>{
        return res.status(200).json({success: true, result})

    })

    //secondary action to log user action starts here
    const variable={
        user: req.body.userId,
        userAction: 'downvote',
        componentId: result._id,
        movieId: req.body.postId,
        docModel: 'Downvote',
        movieTitle: req.body.movieTitle,
    }
    const userAction= new UserAction(variable)
    userAction.save((err, result)=>{
        if(err) return res.json({success: false, err})
        
    })
    
})
})

//undo upvote
router.post('/undoUpvote', (req,res)=>{

    Upvote.findOneAndDelete(req.body).exec((err, result)=>{
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, result})
    })
})

//undo downvote
router.post('/undoDownvote', (req,res)=>{

    Downvote.findOneAndDelete(req.body).exec((err, result)=>{
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true, result})
    })
})


module.exports= router