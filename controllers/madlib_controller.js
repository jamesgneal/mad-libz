var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
// We are now working with multiple models, and need to declare each.
var db = require("../models"),
  madLib = db.MadLib;
story = db.Story;

//need sequelize for logic
var Sequelize = require("../models").Sequelize

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  //the first route pulls all entered words.
  madLib.findAll({}).then(function (result1) {
    story.find({order: [Sequelize.fn('RAND')]}).then(function (result2) {
      //capture the words of the story that was randomly found
      var storyPlaceholder = result2.dataValues.words;
      //search for all words that need to be replaced
      var requiredInputsArray = storyPlaceholder.match(/\b[A-Z0-9]+\b/g);
      //this prunes for "I" and other capitalized single-character words.
      for (var i = 0; i < requiredInputsArray.length; i++) {
        if (requiredInputsArray[i].length===1) {
          requiredInputsArray.splice(i, 1)
        }
      };
      //sanitycheck the for loop
      console.log(requiredInputsArray);
      var handleBarsObj = {
        madLibs: result1,
        story: storyPlaceholder,
        POS: requiredInputsArray
      };
      res.render("index", handleBarsObj);
      console.log(result1); //test to know that they are logged correctly
      console.log(result2); //test to know that they are logged correctly
      console.log(storyPlaceholder);
      console.log(storyPlaceholder.match(/\b[A-Z0-9]+\b/g));
      

      //now, we take the pulled up story, and listen for caps words (VERB NOUN ADVERB etc)
      //take those words and generate entry fields for each one, with suggestions based on the type of word.
      //user enters words. Then their entries are captured in the DOM, and replace the caps words, then the story is displayed
      //afterwards, that story is saved under their userID.
    });
  });
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
