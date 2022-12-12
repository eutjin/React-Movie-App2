const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const ListType = require("../models/listTypeModel");
const CustomList = require("../models/customListModel");

//Create custom list
router.post("/createList", (req, res) => {
  const listType = new ListType(req.body);

  listType.save((err, listtype) => {
    if (err) return res.json({ success: false, err });

    ListType.find({ _id: listtype._id })
      .populate("user")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

//delete custom list + child of these lists
router.delete("/deleteList/:id", async (req, res) => {
  await ListType.findByIdAndDelete(req.params.id).exec((err, results) => {
    if (err) return res.status(400).send(err);
    // console.log('d1')
    // return res.status(200).json({success: true, results})
  });

  await CustomList.deleteMany({ list: req.params.id }).exec((err, results) => {
    if (err) return res.status(400).send(err);
    // console.log('d2')
    return res.status(200).json({ success: true, results });
  });
});

router.post("/editList", (req, res) => {
  console.log("edit shit", req.body);
  ListType.findByIdAndUpdate(
    req.body.listId,
    { listTitle: req.body.listTitle, listDesc: req.body.listDesc },
    { new: true }
  ).exec((err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, result });
  });
});

//get ALL list types
router.post("/getAllList", (req, res) => {
  // console.log("ab", req.body.user)
  // console.log(req.body)
  ListType.find({ user: req.body.user })
    .populate("user")
    .populate("listContents")
    .exec((err, lists) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, lists });
      // console.log("bc", lists)
    });
});

//add movie to custom list
router.post("/addToList", (req, res) => {

  const customlist = new CustomList(req.body);
  customlist.save((err, list) => {
    if (err) return res.json({ success: false, err });

    ListType.updateOne(
      { _id: req.body.list },
      { $push: { listContents: list._id } },
      { new: true }
    ).exec((err, result) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).json({ success: true, result });
    });
  });
});

//remove movie from custom list
router.delete("/removeFromList/:id", (req, res) => {
  CustomList.findByIdAndDelete(req.params.id).exec((err, result) => {
    if (err) return res.status(400).send(err);
    // console.log('del1')
    return res.status(200).json({ success: true, result });
  });

  //   CustomList.find({user: req.body.user}).populate('user').populate('list').exec((err, result)=>{
  //     if(err) return res.json({success: false, err})
  //     console.log(result)
  //     return res.status(200).json({success: true, result})

  // })
});

//get contents of the custom list
router.post("/getCustomList", (req, res) => {
  CustomList.find({ user: req.body.user })
    .populate("user")
    .populate("list")
    .exec((err, result) => {
      if (err) return res.json({ success: false, err });
      console.log(result);
      return res.status(200).json({ success: true, result });
    });
});

//copy list and its contents from another user
router.post("/copyList", (req, res) => {
  console.log("bodyuser", req.body.user);
  ListType.findOne({ _id: req.body.listId }).exec((err, result) => {
    const list = result;
    console.log("abc1", list);
    list._id = mongoose.Types.ObjectId();
    list.user = req.body.user;
    list.isNew = true; //super important
    list.listContents = [];
    list.createdAt = "";
    list.updatedAt = "";
    console.log("listTitleId", list);
    ListType.create(list);

    CustomList.find({ list: req.body.listId }).exec((err, result1) => {
      console.log("result1", result1);
      result1.forEach((item) => {
        item.user = req.body.user;
        item._id = mongoose.Types.ObjectId();
        item.list = list._id;
        item.isNew = true;
        console.log("item", item);
        CustomList.create(item);
      });
      console.log("log", result1);
    });
  });
});

module.exports = router;
