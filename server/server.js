var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Pics = require("../models/pics");

const path = require("path");

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

app.post("/pics", function(req, res) {
  var newPic = new Pics({
    keywords: req.body.keywords,
    cloudinaryId: req.body.cloudinaryId
  });
  newPic.save(function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
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
