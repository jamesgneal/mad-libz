// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  //fairly straightforward, just grab words from form and make an ajax call.
  $("#storyAdd").on("submit", function (event) {
    event.preventDefault();
    var newStory = {
      story: $("#storyForm").val().trim()
    };
    $.ajax("/api/madlibz/stories", {
      type: "POST",
      data: newStory
    }).then(
      function () {
        location.reload();
        console.log("Uploaded Story!")
      })
  })

  $("#wordAdd").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newWord = {
      name: $("#addWord").val().trim(),
    };
    // Send the POST request.
    $.ajax("/api/madlibz", {
      type: "POST",
      data: newWord
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload();
        console.log("created new madlib");
      }
    );
  });
});
