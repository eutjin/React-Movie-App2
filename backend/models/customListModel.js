const mongoose=require('mongoose')

const customListSchema= mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    list:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'ListType'
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

module.exports= mongoose.model('CustomList', customListSchema)