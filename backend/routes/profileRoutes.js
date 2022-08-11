const express = require("express");
const router = express.Router();
const cloudinary= require("../utils/cloudinary");
const upload= require("../utils/multer")

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
// const Comment = require("../models/commentModel");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");


router.post("/saveProfile", (req, res) => {
  console.log("prof1", req.body);

  const profile = new Profile(req.body);
  profile.save((err, profile) => {
    console.log(profile);
    if (err) return res.json({ success: false, err });
    Profile.find({ _id: profile._id })
      .populate("user")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        // return res.status(200).json({ success: true, result });
      });

      User.updateOne({_id: req.body.user}, {profile: profile._id}, { new: true }).exec((err, result)=>{
        if (err) return res.json({ success: false, err });
                
                return res.status(200).json({ success: true, result });
      })
  });
});

router.post("/updateProfile", (req, res)=>{
  console.log("profZ", req.body.user);

  //edited 2022/08/09 .user from .user._id
  Profile.updateOne({user: req.body.user}, {name: req.body.name, about: req.body.about, gender: req.body.gender}, { new: true }).exec((err, result)=>{
    if (err) return res.json({ success: false, err });
            
            return res.status(200).json({ success: true, result });
  })
})

router.post("/getProfile", (req, res) => {
  console.log("prof2", req.body);
  Profile.find({ user: req.body.id }).populate('followers').populate('user').populate({path: 'followers', populate:{path:'profile', model:'Profile'}}).populate({path: 'following', populate:{path:'profile', model:'Profile'}}).exec((err, result) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, result });
  });
});

router.post("/followUser", (req, res) => {
  console.log("prof3", req.body.userToFollow);


Profile.findOne({'user': req.body.user}).exec((err, currentUser)=>{

    console.log('RES',currentUser)
    if(currentUser.following.includes(req.body.userToFollow)){
        console.log('removing added user...')
        Profile.updateOne({user: req.body.userToFollow}, {$pull:{followers: req.body.user}}).exec((err, result)=>{
          if (err) return res.json({success: false, err})
          Profile.updateOne({user: req.body.user}, {$pull:{following: req.body.userToFollow}}).exec((err, result)=>{
            if (err) return res.json({success: false, err})
            return res.status(200).json({ success: true, result });
          })
        })
    }else{
        Profile.updateOne(
            { user: req.body.userToFollow },
            { $push: { followers: req.body.user } },
            { new: true }
          ).exec((err, result) => {
            if (err) return res.json({ success: false, err });
           
            Profile.updateOne(
                { user: req.body.user },
                { $push: { following: req.body.userToFollow } },
                { new: true }
              ).exec((err, result) => {
                if (err) return res.json({ success: false, err });
                
                return res.status(200).json({ success: true, result });
                
              });
        
        });
    }


})

//   Profile.updateOne(
//     { user: req.body.userToFollow },
//     { $push: { followers: req.body.user } },
//     { new: true }
//   ).exec((err, result) => {
//     if (err) return res.json({ success: false, err });
   
//     Profile.updateOne(
//         { user: req.body.user },
//         { $push: { following: req.body.userToFollow } },
//         { new: true }
//       ).exec((err, result) => {
//         if (err) return res.json({ success: false, err });
        
//         return res.status(200).json({ success: true, result });
        
//       });

// });


});



router.post("/upload", upload.single('avatar'), async(req, res)=>{
  console.log('upload', req.body.user)
  try{
    cloudinary.uploader.upload(req.file.path, {"width":500}, function(err, image){
      console.log(image)
      Profile.updateOne({user: req.body.user}, {avatar: image.url, cloudinary_id: image.public_id}, { new: true }).exec((err, result)=>{
        if (err) return res.json({ success: false, err });
                
                return res.status(200).json({ success: true, result });
      })
    })
    
    
  }catch(err){
    console.log(err)
  }
})

// router.post("/upload", upload.single('avatar'), async(req, res)=>{
//   try{
//     const result= await cloudinary.uploader.upload(req.file.path)
//     console.log(res.json(result))
//     // res.json(result)
    
//   }catch(err){
//     console.log(err)
//   }
// })
module.exports = router;
