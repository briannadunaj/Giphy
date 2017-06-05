$(document).ready(function(){

var animate = "0";

var topics = ["Arrested Development", "Portlandia", "The Office", "Key & Peele", "Comedy Bang! Bang!", "Parks and Recreation", "Summer Heights High", "It's Always Sunny in Philadelphia", "Bob's Burgers", "Broad City", "Rick and Morty", "Tim and Eric Awesome Show, Great Job!"];


// --------------- creating buttons --------------- //
// function to create the buttons
function renderButtons() {

	$("#buttons-view").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#buttons-view").append(a);
	} // end of for loop to create buttons for each topic

} // end of renderButtons function


$("#add-show").on("click", function(event) {
	event.preventDefault();

	// capture user input as variable "show"
	var newShow = $("#show-input").val().trim();

	// pushes show into topics array
	topics.push(newShow);
	console.log(topics)

	renderButtons();

}); // end of add show click function

renderButtons();

// ------------ end of button creation --------------//


// function to display gifs
function displayShows() {

		var show = $(this).attr("data-name");

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" 
		+ show + "&api_key=dc6zaTOxFJmzC&limit=10";

	    // AJAX GET request
	    $.ajax({
	    	url: queryURL,
	    	method: "GET"
	    })

	    // after data comes back from the API
	    .done(function(response) {

	    	console.log(response);

	    	var results = response.data;

	    	// looping over every result item
	    	for (var i = 0; i < results.length; i++) {

	    		// creating a div with the class "item"
	    		var gifDiv = $("<div class='item'>");

	    		// storing the result item's rating
	    		var rating = results[i].rating;

	    		// creating a paragraph tag with the result item's rating
	    		var p = $("<p>").text("Rating: " + rating);

	    		// creating an image tag
	    		var showGif = $("<img class = showGif>");

	    		// giving the image tag an src attribute of a property
	    		//pulled off the result item
	    		showGif.attr("src", results[i].images.fixed_height.url).val(i);


	    		showGif.attr("src", $(this).attr("data-state"));


	    		// appending the paragraph and personImage to the 
	    		// "gifDiv" div
	    		gifDiv.append(p);
	    		gifDiv.append(showGif);

	    		$("#shows-view").prepend(gifDiv);


	    	} // end of loop for results
	    
	    	// image will load as still and will animate when clicked
	    	$(".showGif").on("click", function() {
	    		console.log("click")

	    		var state = $(this).attr("data-state");

	    		if (state === "still") {
	    			$(this).attr("src", $(this).attr("data-animate"));
	    			$(this).attr("data-state", "animate");
	    		} else {
	    			$(this).attr("src", $(this).attr("data-still"));
	    			$(this).attr("data-state", "still");

	    		} // end of else statement


	    	}); // end of still/animate function

		}); // end of .done function

}; // end of displayShowInfo function


	$(document).on("click", ".topic", displayShows);
}); // end of document ready function
