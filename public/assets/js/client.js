// Make sure we wait to attach our handlers until the DOM is fully loaded.
var storyPlaceholder = "";
var clean = require("underscore.string/clean");

$(document).ready(function() {
	storyPlaceholder = $("#serverStory")[0].innerText;
	var requiredInputsArray = storyPlaceholder.match(/\b[A-Z0-9]+\b/g);

	//this prunes for "I" and other capitalized single-character words.
	for (var i = 0; i < requiredInputsArray.length; i++) {
		if (requiredInputsArray[i].length === 1) {
			requiredInputsArray.splice(i, 1);
		}
	}

	// Pretty print the POS for the user labels
	for (var i = 0; i < requiredInputsArray.length; i++) {
		var num = i + 1;
		switch (requiredInputsArray[i]) {
			case `NAME${num}`:
				$(`label[for="NAME${num}"]`).empty();
				$(`label[for="NAME${num}"]`).html("Someone's Name:");
				console.log($(`label[for="NAME${num}"]`).val());

			case `NOUN${num}`:
				$(`label[for="NOUN${num}"]`).empty();
				$(`label[for="NOUN${num}"]`).html("Singular Noun:");

			case `NOUNS${num}`:
				$(`label[for="NOUNS${num}"]`).empty();
                $(`label[for="NOUNS${num}"]`).html("Plural Noun:");
                
            case `VERB${num}`:
				$(`label[for="VERB${num}"]`).empty();
                $(`label[for="VERB${num}"]`).html("Present-Tense Verb:");
                
            case `VERBED${num}`:
				$(`label[for="VERBED${num}"]`).empty();
                $(`label[for="VERBED${num}"]`).html("Past-Tense Verb:");
                
            case `ADJ${num}`:
				$(`label[for="ADJ${num}"]`).empty();
				$(`label[for="ADJ${num}"]`).html("Adjective:");
		}
	}

	//sanitycheck the for loop
	console.log(requiredInputsArray);

	// Submit process for the User's words
	$("#storyWordsAdd").on("submit", function(event) {
		event.preventDefault();
		for (var i = 0; i < requiredInputsArray.length; i++) {
			//find and replace RIA[i] with $(`#RIA[i]`).val().trim();
			var newWord = $(`#${requiredInputsArray[i]}`).val();
			clean(newWord);
			if (!newWord) {
				$("#user-notification").empty();
				$("#user-notification").text("NO TROLLING WITH BLANKS, PLEASE.");
				$("#user-notification").css({
					color: "red",
					"font-size": "200%"
				});

				return;
			} else {
				storyPlaceholder = storyPlaceholder.replace(
					requiredInputsArray[i],
					newWord
				);
			}
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
	});

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
});
