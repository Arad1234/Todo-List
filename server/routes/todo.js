const express = require("express");
const router = express.Router();
const Missions = require("../models/missions");

router
  .route("/missions")
  .get(async (req, res) => {
    try {
      const missions = await Missions.find();
      res.json(missions);
    } catch (e) {
      res.send(e);
    }
  })
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const missions = new Missions(req.body);
      await missions.save();
      res.send("Document Added");
    } catch (e) {
      console.log(e);
    }
  })
  .delete((req, res) => {
    Missions.deleteMany({}, (error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send("All the documents deleted");
      }
    });
  });

router
  .route("/missions/:id")
  .delete((req, res) => {
    const id = req.params.id;
    // try {
    Missions.findByIdAndDelete(id, (error, document) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(`Deleted ${document.mission}`);
      }
    });
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    try {
      await Missions.findByIdAndUpdate(id, {
        checkbox: req.body.checkbox,
        mission: req.body.mission,
      });
      res.send("Updated");
    } catch (e) {
      console.log(e + " Backend Error");
    }
  });

module.exports = router;
