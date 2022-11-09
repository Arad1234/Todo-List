const express = require("express");
let router = express.Router();
const People = require("../models/peoples");

router.use((req, res, next) => {
  console.log(req.baseUrl + req.url);
  next();
});

router
  .route("/peoples")
  .get(async (req, res) => {
    try {
      const people = await People.find();
      res.json(people);
    } catch (e) {
      res.send(e + " asasa");
    }
  })
  .put(async (req, res) => {
    const peoples = new People({ number: req.body.number });
    await peoples.save();
    res.json(peoples.number);
  });

module.exports = router;
