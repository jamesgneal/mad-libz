var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
// We are now working with multiple models, and need to declare each.
var db = require("../models"),
  madLib = db.MadLib;
story = db.Story;

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  //the first route pulls all entered words.
  madLib.findAll({}).then(function (result) {
    var handleBarsObj = {
      madLibs: result
    };
    res.render("index", handleBarsObj);
  })
  //second route pulls all entered stories.
  story.findAll({}).then(function (result) {
    console.log(result) //this is how we prove it pulls the data we entered. Accessed through Story.dataValues.words
    //we will render through a handelbars "partial", I believe? We will ideally load the story at the same time as 
    //mad lib words, and then render the story onto a partial template within the index.handlebars file.
  })
});

router.post("/api/madlibz", function (req, res) {
  //Posting path for words
  madLib.create({
    word: req.body.name,
    type: "Verb",
    client_id: 0
  }).then(function (result) {
    //this actually may not be necessary
    res.json({ id: result.insertId });
  });
});

router.post("/api/madlibz/stories", function (req, res) {
  //posting path for stories.
  console.log(req.body);
  story.create({
    words: req.body.story,
  }).then(function (result) {
    // May just want the insertId for future logic, unclear if useful
    res.json({ id: result.insertId });
  });
});


// Export routes for server.js to use.
module.exports = router;
