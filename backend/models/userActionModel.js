const mongoose=require('mongoose')

const userActionSchema= mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userAction:{
        type: String,
    },
    componentId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'docModel'
    }, 
    docModel:{
        type: String,
        required: true,
        enum: ['Comment', 'Upvote', 'Downvote']
    },
    movieId:{
        type: String,
    },
    movieTitle:{
        type: String,
    }
}, {
    timestamps: true,
})

module.exports= mongoose.model('UserAction', userActionSchema)