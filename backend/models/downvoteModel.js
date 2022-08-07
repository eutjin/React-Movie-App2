const mongoose= require('mongoose')

const downvoteSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
    
  
}, {
    timestamps: true
})

module.exports=mongoose.model('Downvote', downvoteSchema)