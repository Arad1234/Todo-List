const express = require("express");
let router = express.Router();
const Missions = require("../models/missions");

router.use((req, res, next) => {
  console.log(req.baseUrl + req.url);
  next();
});

router
  .route("/peoples")
  .get(async (req, res) => {
    try {
      const missions = await Missions.find();
      res.json(missions);
    } catch (e) {
      res.send(e + " asasa");
    }
  })
  .put(async (req, res) => {
    const missions = new Missions({ number: req.body.number });
    await missions.save();
    res.json(missions.number);
  });

module.exports = router;
