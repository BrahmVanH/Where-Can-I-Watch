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
const streamingServicesEl = $('#streamingServices');


apiUrl = 'https://imdb-api.com'
apiKey = 'k_34v6xu6e/'
apiKey2 = 'k_alj13px2/'
function getTitleId(searchTitle) {
	
	url = apiUrl + '/en/API/SearchTitle/' + apiKey2 + searchTitle
	
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
		
    })
	.then(function(data) {
		console.log(data);
		getTitleInformation(data.results[0].id);
		getStreamingServices(data.results[0].id);

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}

function getTitleInformation(titleId) {
	
	url = apiUrl + '/en/API/Title/' + apiKey2 + titleId + '/Images,Ratings';
	
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

function getStreamingServices(IMDBId) {

	url = apiUrl +'/en/API/ExternalSites/' + apiKey2 + IMDBId 
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
	})
	.then(function(data) {
		console.log(data);
		populateMovieCard(data);
		grabServices(data);
			
	}) 
	.catch(function(err) {
		console.error(err);
	})

}

function grabServices(allServices) {

    if(!allServices.netflix) {

		console.log('no netflix here')
	}
	
	else {
        var netflixLi = $('<a>');
        netflixLi.attr('href', allServices.netflix.url);
		var netflixImg = $('<img>');
		netflixImg.attr('src', "./assets/logonetflix.png")
		netflixImg.attr('target', '_blank');
        streamingServicesEl.append(netflixLi);
		netflixLi.append(netflixImg);
        console.log('run');
        console.log(allServices.netflix.url)

		/* **Still need buttons**
		Netflix
		Hulu
		Disney Plus
		Paramount+
		Amazon Prime Video
		Apple TV
		HBO Max
		Showtime */
			
    }


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

	localStorage.setItem("Watch Item", JSON.stringify(movieTitleEl));
	createWatchList();
	console.log('save title');
	console.log(JSON.stringify(movieTitleEl))

} 

 function createWatchList() {

	var list = $('<ul>')
	watchList.append(list);

	for (let i = 0; i < localStorage.length; i++) {

		var watchItem = $('<li>')
		var storedItem = localStorage.getItem(i);
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






