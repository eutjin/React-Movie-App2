const mongoose= require('mongoose')

const uploadSchema = mongoose.Schema({
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    // avatar: {
    //     type: Buffer, // casted to MongoDB's BSON type: binData
    //     required: true
    // }
    image: {
        data: Buffer,
        contentType: String
    }
  
}, {
    timestamps: true
})

module.exports=mongoose.model('Upload', uploadSchema)