const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    packageName: { type: String, enum: ["1000", "2800", "7500", "13500"] },
    entry: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    completed: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
