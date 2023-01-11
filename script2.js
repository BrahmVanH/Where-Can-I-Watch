var searchBtn = $('#searchBtn');
var searchInput = $('#searchInput');
var watchList = $('#watchList');
var saveBtn = $('#saveBtn')
var movieTitleEl = $('#movieTitle');
var ratingEl = $('#movieRating');
var yearEl = $('#movieYear');
var genreEl = $('#movieGenre');
var imageEl = $('#movieImage');
var synopsisEl = $('#movieSynopsis');


apiUrl = 'https://imdb-api.com'
apiKey = 'k_34v6xu6e/'
function getTitleId(searchTitle) {
	
	url = apiUrl + '/en/API/SearchTitle/' + apiKey + searchTitle
	
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
    })
	.then(function(data) {
		console.log(data);
		getTitleInformation(data.results[0].id);
		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}

function getTitleInformation(titleId) {
	
	url = apiUrl + '/en/API/Title/' + apiKey + titleId + '/Images,Ratings';
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
	})
	.then(function(data) {
		console.log(data);
		populateMovieCard(data);	
	}) 
	.catch(function(err) {
		console.error(err);
	})
	
}

/* function createMovieCard() {
	var movieResults = $('#movieResults');
	
	var title = $('<p>');
	var year = $('<p>');
	var rating = $('<p>');
	var genre = $('<p>');
	var synopsis = $('<p>');
	var image = $('<img>');
	var saveBtn = $('<button>save to watch list</button>')
	
	title.attr('id', 'movieTitle');
	year.attr('id', 'movieYear');
	rating.attr('id', 'movieRating');
	genre.attr('id', 'movieGenre');
	synopsis.attr('id', 'movieSynopsis');
	image.attr('id', "movieImage");
	image.attr('alt', "Image from cover of movie");
	
	
	
	movieResults.append(title);
	movieResults.append(year);
	movieResults.append(rating);
	movieResults.append(genre);
	movieResults.append(synopsis);
	movieResults.append(image);
	
	
} */

function populateMovieCard(data) {
	
	// createMovieCard();
	
	/* var title = $('#movieTitle');
	var year = $('#movieYear');
	var rating = $('#movieRating');
	var genre = $('#movieGenre');
	var synopsis = $('#movieSynopsis');
	var image = $('#movieImage'); */

	
	movieTitleEl.text(data.fullTitle);
	yearEl.text(data.year);
	ratingEl.text(data.contentRating);
	genre.text(data.genres);
	synopsis.text(data.plot);
	image.attr('src', data.imgages.items[0].image);
	
}

function searchSubmit(event) {

	event.preventDefault();
	var title = searchInput.val();
	getTitleId(title);
	
}

/* function saveTitle() {

	savedTitle = title.text;
	savedYear = year.text;

	localStorage.setItem(savedTitle, savedYear);
	createWatchList();
	console.log('save title');

} */

/* function createWatchList() {

	var list = $('<ul>')
	watchList.append(list);

	for (let i = 0; i < localStorage.length; i++) {

		var watchItem = $('<li>')
		var storedItem = localStorage.getItem(i);
		watchItem.text = storedItem;
		list.append(watchItem);
	}
} */

saveBtn.on('click', function() {
	movieYear = $(this).siblings('#movieYear').text;
	movieTitle = $(this).siblings('#movieTitle').text;
	localStorage.setItem(movieTitle, movieYear);
  });



searchBtn.on('click', searchSubmit);


/* Title data.results[0].title
Year data.results[0].year
Rating data.results[0].rating
Genre data.results[0].title_type
Synopsis data.results[0].synopsis
Image data.results[0].img


*/

// function to save identified items into local storage
// function to create button on movie card that saves to local storage
// function to clear local storage
// function to create list items with watch list items
// li should have anchor tag 


function renderWatchListItems() {

	watchList.empty();

	for (let i = 0; i < watchTitles.length; i++) {

		var li = $('<option>');
		li.addClass('watchTitleName');
		li.attr('data-name', watchTitles[i]);
		watchList.appen(li);

		li.text(watchTitles[i])

		
	}
}



saveBtn.on('click', storeToWatchList)
