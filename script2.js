const searchBtn = $('#searchBtn');
const searchInput = $('#searchInput');
const watchList = $('#watchList');
const saveBtn = $('#saveBtn')
const movieTitleEl = $('#movieTitle');
const ratingEl = $('#movieRating');
const yearEl = $('#movieYear');
const genreEl = $('#movieGenre');
const imageEl = $('#movieImage');
const synopsisEl = $('#movieSynopsis');


apiUrl = 'https://imdb-api.com'
apiKey = 'k_alj13px2/'           

/*Additional Keys
k_9qsd16n6
k_alj13px2
k_34v6xu6e
*/

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


function populateMovieCard(data) {
	
	movieTitleEl.text(data.fullTitle);
	yearEl.text(data.year);
	ratingEl.text(data.contentRating);
	genreEl.text(data.genres);
	synopsisEl.text(data.plot);
	imageEl.attr('src', data.image);
	
}

function searchSubmit(event) {

	event.preventDefault();
	var title = searchInput.val();
	getTitleId(title);
	
}

 function saveTitle(event) {

	
	event.preventDefault();

	window.localStorage.setItem("Watch Item", JSON.stringify(movieTitleEl));
	createWatchList();
	console.log('save title');
	console.log(JSON.stringify(movieTitleEl))

} 

 function createWatchList() {

	var list = $('<ul>')
	watchList.append(list);

	for (let i = 0; i < localStorage.length; i++) {

		var watchItem = $('<li>')
		var storedItem = window.localStorage.getItem(i);
		watchItem.text = storedItem;
		list.append(watchItem);
	}
}
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

/* This bit of code lets you hit the "enter" key to search as well as the actual search button.*/
var input = document.getElementById("searchInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});


searchBtn.on('click', searchSubmit);
saveBtn.on('click', saveTitle);


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






