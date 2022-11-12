const express = require("express");
let router = express.Router();
const Missions = require("../models/missions");
// router.use((req, res, next) => {
//   console.log(req.baseUrl + req.url);
//   next();
// });

router
  .route("/missions")
  .get(async (req, res) => {
    try {
      const missions = await Missions.find();
      res.json(missions);
    } catch (e) {
      res.send(e + " asasa");
    }
  })
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const missions = new Missions({ mission: req.body.mission });
      await missions.save();
      res.send("Added");
    } catch (e) {
      console.log(e);
    }
  });

router.delete("/missions/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Missions.findByIdAndDelete(id);
    res.send("Deleted");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
