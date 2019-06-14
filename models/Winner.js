const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const winnerSchema = new Schema(
  {
    packageName: { type: String, enum: ["1000", "2800", "7500", "13500"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Winner = mongoose.model("Winner", winnerSchema);

module.exports = Winner;
