const mongoose= require('mongoose')

const upvoteSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    movieTitle:{
        type: String,
        
    }
    
  
}, {
    timestamps: true
})

module.exports=mongoose.model('Upvote', upvoteSchema)