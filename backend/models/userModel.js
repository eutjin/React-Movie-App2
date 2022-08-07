const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add name']
    },
    email:{
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please add password']
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
  
}, {
    timestamps: true
})

module.exports=mongoose.model('User', userSchema)