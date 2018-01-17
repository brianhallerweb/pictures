var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var picSchema = Schema({
  keywords: { type: String, required: true },
  filePath: { type: String, required: true }
});

picSchema.index({ keywords: "text" });

var Pics = mongoose.model("Pics", picSchema);

module.exports = Pics;
