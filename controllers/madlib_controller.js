var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models"),
  madLib = db.MadLib;

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  //  burger.selectAll(function(data) {
  //    var hbsObject = {
  //      burgers: data
  //    };
  //    console.log(hbsObject);
  //    res.render("index", hbsObject);
  //  });
  madLib.findAll({}).then(function (result) {
    var handleBarsObj = {
      madLibs: result
    };
    res.render("index", handleBarsObj);
  })
});

router.post("/api/burgers", function (req, res) {
  //burger.insertOne(["burger_name"], [req.body.name], function (result) {
  //  // Send back the ID of the new quote
  //  res.json({ id: result.insertId });
  //});
  madLib.create({
    word: req.body.name,
    type: "Verb",
    client_id: 0
  }).then(function (result) {
    // We have access to the new todo as an argument inside of the callback function
    res.json({ id: result.insertId });
  });
});

// Export routes for server.js to use.
module.exports = router;
