var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send(['respond with a resource', 'sass']);
// });

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/payaniga");


var users = new mongoose.Schema({
  firstName: String,
  lastName: String
});

var User = mongoose.model("users", users);




router.post('/adduser', function (req, res, next) {
  console.log("adduser: called ========================================== ")
  console.log("myData : ", req.body)
  var myData = new User(req.body);

  myData.save()
    .then(item => {
      console.log("item : ", item)
      res.send("item saved to database");
    })
    .catch(err => {
      console.log("====================================================", err)
      res.status(400).send("unable to save to database");
    });

});



router.get('/getusers', function (req, res, next) {
  console.log("adduser: called ========================================== ")




  User.find({}, (err, users) => {
    // var userMap = {};

    // users.forEach(function (user) {
    //   userMap[user._id] = user;
    // });

    res.send(users);
  });

});


module.exports = router;
