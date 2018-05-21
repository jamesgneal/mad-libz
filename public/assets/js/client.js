// Make sure we wait to attach our handlers until the DOM is fully loaded.
var storyPlaceholder = "";

$(document).ready(function() {
	storyPlaceholder = $("#serverStory")[0].innerText;
	var requiredInputsArray = storyPlaceholder.match(/\b[A-Z0-9]+\b/g);

	//this prunes for "I" and other capitalized single-character words.
	for (var i = 0; i < requiredInputsArray.length; i++) {
		if (requiredInputsArray[i].length === 1) {
			requiredInputsArray.splice(i, 1);
		}
	}

	//sanitycheck the for loop
	console.log(requiredInputsArray);

	// Submit process for the User's words
	$("#storyWordsAdd").on("submit", function(event) {
		event.preventDefault();
		for (var i = 0; i < requiredInputsArray.length; i++) {
			//find and replace RIA[i] with $(`#RIA[i]`).val().trim();
			var newWord = $(`#${requiredInputsArray[i]}`)
				.val()
				.trim();
			storyPlaceholder = storyPlaceholder.replace(
				requiredInputsArray[i],
				newWord
			);
		}
		$("#printedStory").empty();

		//Splitting the story string into an array, so div tags can be added around each word
		var totalStoryArr = storyPlaceholder.split("*");

		for (var i = 0; i < totalStoryArr.length; i++) {
			totalStoryArr[i] = `<div class="animated">${totalStoryArr[i]}</div>`;
		}
		var totalStoryToString = totalStoryArr.join("");

		$("#printedStory").html(totalStoryToString);
		//  $("#printedStory").show();
		$(".animated")
			.first()
			.show("fast", function showNext() {
				$(this)
					.next(".animated")
					.show("fast", showNext);
            });
        
        $("#storyWordsAdd").hide();
            
        $("#save-story, #new-story").show("fast");

        console.log(storyPlaceholder);
    });
    

    // Listener for new story
    $("#new-story").on("click", function(event) {
        event.preventDefault();
        location.reload();
    })


	//fairly straightforward, just grab words from form and make an ajax call.
	$("#save-story").on("click", function(event) {
		event.preventDefault();
		$.ajax("/api/madlibz/completedstories", {
			type: "POST",
			data: {
                newStory: storyPlaceholder
            }
		}).then(function() {
            console.log("Uploaded Story!");
            $("#printedStory").empty();
            $("#printedStory").html("Your story has been uploaded.");
            $("#save-story").hide("fast");
            $("#view-random-story").show("fast");
		});
    });
    

    // Display a random story
    // $("#view-random-story").on("click", function(event) {
    //     event.preventDefault();
    //     $.ajax("/api/madlibz/completedstories", {
	// 		type: "GET",
	// 	}).then(function() {
    //         console.log("Got a Story!");
    //         $("#storyWordsAdd").hide();

    //         $(".animated")
	// 		.first()
	// 		.show("fast", function showNext() {
	// 			$(this)
	// 				.next(".animated")
	// 				.show("fast", showNext);
    //         });
            
    //         $("#new-story").show("fast");

	// 	});
    // });


	// $("#wordAdd").on("submit", function(event) {
	// 	// Make sure to preventDefault on a submit event.
	// 	event.preventDefault();
	// 	var newWord = {
	// 		name: $("#addWord")
	// 			.val()
	// 			.trim()
	// 	};
	// 	// Send the POST request.
	// 	$.ajax("/api/madlibz", {
	// 		type: "POST",
	// 		data: newWord
	// 	}).then(function() {
	// 		// Reload the page to get the updated list
	// 		location.reload();
	// 		console.log("created new madlib");
	// 	});
	// });
});
