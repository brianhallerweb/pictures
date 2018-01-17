var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Pics = require("../models/pics");
var multer = require("multer");
const path = require("path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "brianhallerweb",
  api_key: "574846749284825",
  api_secret: "-G1krosA4aRXET_T28tOoKE6C-Y"
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/pictureGallery"
);

app.use(bodyParser.json());

app.get("/pics", function(req, res) {
  Pics.find(function(err, pics) {
    res.json(pics);
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
  cloudinary.v2.uploader
    .upload_stream({ resource_type: "raw" }, function(error, result) {
      var newPic = new Pics({
        keywords: req.body.keywords,
        filePath: result.secure_url
      });
      newPic.save(function(err, result) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(result);
        }
      });
    })
    .end(req.file.buffer);
});

app.use(express.static("build"));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../build/index.html"))
);

app.listen(process.env.PORT || 3001);
