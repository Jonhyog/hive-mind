const mongoose = require("mongoose");

const hiveSchema = new mongoose.Schema({
  hiveId: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  description: { type: String, required: false },
}).index({ hiveId: 1 });

const Hive = mongoose.model("Hives", hiveSchema);

module.exports = Hive;
