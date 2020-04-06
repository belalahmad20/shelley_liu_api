const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectID;
const moment = require("moment");
const Mailer = require("../config/nodemailer");
const fileUpload = require("../config/uploadFile");
const otp = require("../config/Otp");

exports.getAllListing = (req, res, db) => {
  db.collection("listing").find().project({name : 1 , address : 1, thumbnail : 1 , isSold : 1, price : 1 }).toArray().then(response => {
    res.send({
      status : true,
      message : "List of all listings",
      data : response
    })
  }).catch(err => {
    res.send({
      status : false,
      message : "Some error Occured",
      data : err
    })
  })
};
exports.getSingleListing = (req, res, db) => {
  db.collection("listing").findOne({_id : ObjectId(req.params.id)}).then(response => {
    res.send({
      status : true,
      message : "Details of listing",
      data : response
    })
  }).catch(err => {
    res.send({
      status : false,
      message : "Some error Occured",
      data : err
    })
  })
};
exports.submitRequest = (req, res, db) => {
  let data = req.body;
  data.listingId = ObjectId(data.listingId);
  db.collection("submittedRequest").insertOne(data).then(response => {
    res.send({
      status : true,
      message : "Request Submitted"
    })
  }).catch(err => {
    res.send({
      status : false,
      message : "Some error Occured",
      data : err
    })
  })
};
exports.getAllListing = (req, res, db) => {};
exports.getAllListing = (req, res, db) => {};
exports.getAllListing = (req, res, db) => {};

exports.test = async (req, res, db) => {
  // Otp Sending
  let Otp = Math.floor(1000 + Math.random() * 9000);
  otp.otpSend(phone, Otp);

  // Mailer function
  let data = req.body;
  data.emailsubject = "New Buy Land form from App";
  data.emailmessage = "HTML CONTENT"
  Mailer(data);

  // Bcrypt hash generator
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(data.Password, salt);
  data.Password = hash;

  // File Upload
  var currentdate = moment().format("MM-DD-YYYY");
  let data1 = req.body;
  let imagebase = req.body.ImageUser;
  var promise = await fileUpload.uploadFile(
    imagebase.type,
    imagebase.file,
    "FOLDER_NAME" + imagebase.name + "_" + currentdate
  );
  data1.ImageUser = promise.Location;

  // Bcrypt Compare
  if (bcrypt.compareSync(req.body.Password, user.Password)) {
  } else {
  }

  // JWT Sign
  var token = jwt.sign(data, process.env.JWT_KEY)
};