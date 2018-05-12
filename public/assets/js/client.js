// Make sure we wait to attach our handlers until the DOM is fully loaded.
//So, need for a listener to be attached that looks for true devour statuses (a la sleepy with the cats)
//and if devour is true, then display them in a separate column.
$(function () {
    $(".create-form").on("submit", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newWord = {
        name: $("#addWord").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newWord
      }).then(
        function () {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  