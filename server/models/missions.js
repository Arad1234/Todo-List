const mongoose = require("mongoose");

const missionsSchema = mongoose.Schema({
  text: { type: String, required: true },
});

const Missions = mongoose.model("Missions", missionsSchema);

module.exports = Missions;
