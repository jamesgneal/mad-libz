// Make sure we wait to attach our handlers until the DOM is fully loaded.
//So, need for a listener to be attached that looks for true devour statuses (a la sleepy with the cats)
//and if devour is true, then display them in a separate column.
$(function () {
  $("#storyAdd").on("submit", function (event) {
    event.preventDefault();
    var newStory = {
      story: $("#storyForm").val().trim()
    }
    $.ajax("/api/madlibz/stories", {
      type: "POST",
      words: newStory
    }).then(function () {
      console.log("Uploaded Story!")
      location.reload();
    })
  })

  $("#storyLoad").on("submit", function (event) {
    event.preventDefault();
    $.ajax("/api/madlibz/stories", {
      type: "GET"
    }).then(
      function () {
        console.log("Fetched a story!")
        location.reload();
      }
    )
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
        console.log("created new madlib");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
