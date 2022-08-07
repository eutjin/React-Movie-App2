const mongoose=require('mongoose')

const listTypeSchema= mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    listTitle: {
        type: String,  
    },
    listDesc: {
        type: String,  
    },
    listContents:[{type: mongoose.Schema.Types.ObjectId, ref: 'CustomList'}],

},{
    timestamps: true,
})

module.exports= mongoose.model('ListType', listTypeSchema)