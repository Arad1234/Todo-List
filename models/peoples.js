const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema({
  number: { type: Number },
});

const People = mongoose.model("People", peopleSchema);

module.exports = People;
