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
    try {
      const missions = new Missions({ text: req.body.text });
      await missions.save();
      res.json(missions);
      res.status(200).send();
    } catch (e) {
      console.log(e);
    }
  });

module.exports = router;
