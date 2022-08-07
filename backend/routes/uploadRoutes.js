const express =require('express')
const router= express.Router()
const multer= require('multer')
const path = require('path')
const fs= require('fs')
const mongoose= require('mongoose')
const {registerUser, loginUser, getMe}= require('../controllers/userController')

const {protect}= require('../middleware/authMiddleware')
// const Upload= require('../models/uploadModel')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  const upload = multer({ storage: storage })

  const imageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
});

const ImageModel = mongoose.model("Image", imageSchema);

router.post("/create", upload.single("avatar"), (req, res) => {
    const obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: "image/png"
        }
    }
    const newImage = new ImageModel({
        image: obj.img
    });

    newImage.save((err) => {
        err ? console.log(err) : res.redirect("/");
    });
});


  

//   router.post('/create', upload.single('avatar'),(req,res)=>{
//       console.log("hey")
//       console.log(req.file)
   
//       const obj = {
//         img: {
//             data: fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
//             contentType: "image/png"
//         }
//     }
//     const newImage = new Upload({
//         image: obj.img
//     });

//     newImage.save((err) => {
//         err ? console.log(err) : res.redirect("/");
//     }); 

// })


// router.post("/create", upload.single('avatar'), (req, res)=>{
//     console.log('hey hey hey')
//     console.log(req.files)
   
// })



module.exports= router
