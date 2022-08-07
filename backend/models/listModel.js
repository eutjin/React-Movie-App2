const mongoose=require('mongoose')

const listSchema= mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    id: {
        type: String,  
    },
    imgSrc: {
        type: String,  
    },
    title: {
        type: String,  
    },
    rating: {
        type: String,  
    },
    genres: {
        type: [String],  
    },
    runtime: {
        type: String,  
    },

},{
    timestamps: true,
})

module.exports= mongoose.model('List', listSchema)