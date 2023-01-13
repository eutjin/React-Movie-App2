const express =require('express')
const router= express.Router()
const {registerUser, loginUser, getMe}= require('../controllers/userController')

const {protect}= require('../middleware/authMiddleware')
const Comment= require('../models/commentModel')
const UserAction= require('../models/userActionModel')

router.post('/saveComment', (req, res)=>{
    console.log('sc',req.body)
    let entry;
const comment=new Comment(req.body)
comment.save((err, comment)=>{
    if(err) return res.json({success: false, err})
    entry=comment._id;
    Comment.find({'_id': comment._id}).populate('writer').exec((err, result)=>{
        if(err) return res.json({success: false, err})
        console.log("save_comment", result)
        return res.status(200).json({success: true, result})
    })
    console.log('entry', entry)
    
    //secondary action to log user action starts here
    const variable={
        user: req.body.writer,
        userAction: 'saveComment',
        componentId: entry,
        movieId: req.body.postId,
        movieTitle: req.body.movieTitle,
        docModel: 'Comment',
    }
    const userAction= new UserAction(variable)
    userAction.save((err, result)=>{
        if(err) return res.json({success: false, err})
        
    })
})
})

router.post('/getComment', (req, res)=>{
// console.log(req.body)
    Comment.find({'postId': req.body.postId, 'active': true}).populate('writer').populate({path: 'writer', populate:{path:'profile', model:'Profile'}}).exec((err, comments)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, comments})
    })

    })

// //delete comment OLD DELETE STYLE
// router.delete('/deleteComment/:id', (req, res)=>{
    

//     Comment.findByIdAndDelete(req.params.id).exec((err, comments)=>{
//         if(err) return res.status(400).send(err)
//         console.log('exe1')
//     })

//     Comment.find({'postId': req.body.postId}).populate('writer').exec((err, comments)=>{
//         if(err) return res.status(400).send(err)
//         res.status(200).json({success: true, comments})
//         console.log('exe2')
//     })
//     })

    //delete V2
    router.put('/deleteComment/:id', (req,res)=>{
        console.log('111', req.body.active)
        Comment.findByIdAndUpdate(req.params.id, req.body, {new: true,}).populate('writer').exec((err,result)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, result})
        })

         //secondary action to log user action starts here
    const variable={
        user: req.body.userId,
        userAction: 'deleteComment',
        componentId: req.body.commentId,
        movieId: req.body.postId,
        movieTitle: req.body.movieTitle,
        docModel: 'Comment',
    }
    const userAction= new UserAction(variable)
    userAction.save((err, result)=>{
        if(err) return res.json({success: false, err})
        
    })
    })

    //edit comment
    router.put('/editComment/:id', (req, res)=>{
        console.log("EDIT COMMENT",req.body)
        console.log(req.params.id)
        Comment.findByIdAndUpdate(req.params.id, req.body, { new: true,}).populate('writer').exec((err, result)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, result})
           
            console.log('edit')
        })

        // Comment.find({'_id': req.params.id}).populate('writer').exec((err, result)=>{
        //     if(err) return res.json({success: false, err})
        //     return res.status(200).json({success: true, result})
        //     console.log('edit succeess')
        // })
    })

module.exports= router