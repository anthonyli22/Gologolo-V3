var mongoose = require("mongoose");

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 144 },
  borderWidth: { type: Number, min: 2, max: 144 },
  borderPadding: { type: Number, min: 2, max: 144 },
  borderMargin: { type: Number, min: 2, max: 144 },
  fontSize: { type: Number, min: 2, max: 144 },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Logo", LogoSchema);
