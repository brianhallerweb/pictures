var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Pics = require("./models/pics");
const multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(bodyParser.json());

app.get("/pics", function(req, res) {
  Pics.find(function(err, pics) {
    res.json(pics);
  });
});

app.get("/pic/:id", function(req, res) {
  Pics.findOne({ cloudinaryId: req.params.id }, function(err, pic) {
    res.json(pic);
  });
});

app.get("/search/:searchString", function(req, res) {
  Pics.find({
    $text: { $search: req.params.searchString }
  }).exec(function(err, pics) {
    res.json(pics);
  });
});

app.post("/pics", upload.single("myImage"), function(req, res) {
  client
    .webDetection(req.file.buffer)
    .then(results => {
      const webDetection = results[0].webDetection;
      var descriptionArray = webDetection.webEntities.map(
        contents => contents.description
      );
      var descriptionString = descriptionArray.join(" ");

      var newPic = new Pics({
        keywords: descriptionString,
        cloudinaryId: req.body.cloudinaryId
      });

      newPic.save(function(err, result) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(result);
        }
      });
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
});

app.delete("/delete/:id", function(req, res) {
  cloudinary.v2.uploader.destroy(req.body.cloudinary_id, function(
    error,
    result
  ) {
    Pics.remove({ _id: req.params.id }, function(err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    });
  });
});

app.use(express.static("build"));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../build/index.html"))
);

app.listen(process.env.PORT || 3001);
