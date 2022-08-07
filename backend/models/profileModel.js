const mongoose=require('mongoose')

const profileSchema= mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,  
    },
    about: {
        type: String,  
    },
    gender: {
        type: String,  
    },
    avatar:{
        type: String,
    },
    cloudinary_id:{
        type: String,
    },
    followers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        following:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

},{
    timestamps: true,
})

module.exports= mongoose.model('Profile', profileSchema)