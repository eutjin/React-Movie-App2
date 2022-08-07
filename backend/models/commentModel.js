const mongoose= require('mongoose')

const commentSchema = mongoose.Schema({
    writer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieTitle:{
        type: String
    },
    postId:{
        type: String,
    },
    responseTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content:{
        type: String
    },
    title:{
        type: String
    },
    rating:{
        type: String
    },
    active:{
        type: Boolean
    }, 
    
    
  
}, {
    timestamps: true
})

module.exports=mongoose.model('Comment', commentSchema)