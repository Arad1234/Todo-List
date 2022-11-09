const mongoose = require("mongoose");

const missionsSchema = mongoose.Schema({
  number: { type: Number },
});

const Missions = mongoose.model("Missions", missionsSchema);

module.exports = Missions;
