const asyncHandler=require('express-async-handler')

const List = require('../models/listModel')
const User= require('../models/userModel')

// @desc get goals
// @route GET /api/goals
// @access Private
const getMovies= asyncHandler(async (req, res)=>{
    const list= await List.find({user: req.user.id}) //made possible by authMiddleware
    res.status(200).json(list)
})

// @desc set goals
// @route POST /api/goals
// @access Private
const setMovies= asyncHandler(async (req, res)=>{
    if(!req.body.id){
        res.status(400)
        throw new Error('please add id field')
    }

    const list= await List.create({
       
        user: req.user.id, //create goals as a user?
        id: req.body.id,
        imgSrc: req.body.imgSrc,
        title: req.body.title, 
        rating: req.body.rating, 
        genres: req.body.genres,
        runtime: req.body.runtime,
    })
    List.find({user: req.user.id}).exec((err, favs)=>{
        if (err) return res.status(400).send(err)
        res.status(200).json(favs)
        console.log(favs)
    })
    // res.status(200).json(list)
})

// @desc update goals
// @route PUT /api/goals/:id
// @access Private 
const updateMovies= asyncHandler(async (req, res)=>{
    const list= await List.findById(req.params.id)

    if(!list){
        res.status(400)
        throw new Error('list not found')
    }

    // const user= await User.findById(req.user.id)
    // console.log(user)

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure logged in user matches list user
    if(list.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedMovie=await List.findByIdAndUpdate(req.params.id, req.body, { new: true,})
    res.status(200).json(updatedMovie)
})

// @desc delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteMovies= asyncHandler(async (req, res)=>{
    const list= await List.findById(req.params.id) 

    if(!list){
        res.status(400)
        throw new Error('list not found')
    }

    // const user= await User.findById(req.user.id)

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure logged in user matches list user
    if(list.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('user not authorized')
    }


    await list.remove()

    
    List.find({user: req.user.id}).exec((err, favs)=>{
        if (err) return res.status(400).send(err)
        res.status(200).json(favs)
        console.log(favs)
    })
})

module.exports={
    getMovies, setMovies, updateMovies, deleteMovies
}