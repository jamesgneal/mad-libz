var storyPlaceholder = "";

$(document).ready(function() {
	storyPlaceholder = $("#serverStory")[0].innerText;

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
        
        $("#new-story").show("fast");
        $("#view-random-story").show("fast");
});
