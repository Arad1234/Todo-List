const mongoose = require("mongoose");

const missionsSchema = mongoose.Schema({
  mission: { type: String, required: true },
});

const Missions = mongoose.model("Missions", missionsSchema);

module.exports = Missions;
