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
const mainContent = $('#mainContent');


apiUrl = 'https://imdb-api.com'
apiKey = 'k_7jji1u3r/'
apiKey2 = 'k_alj13px2/'
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
		getStreamingServices(data.results[0].id);

		
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

function getStreamingServices(IMDBId) {

	url = apiUrl +'/en/API/ExternalSites/' + apiKey + IMDBId 
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
/* This bit of code deletes the old logo/link from previous search*/
	let streamingLogo = document.getElementById("streamingServices");
	while (streamingLogo.firstChild) {
		streamingLogo.removeChild(streamingLogo.firstChild)
	}
	
    if(allServices.netflix) {

		var netflixLi = $('<a>');
        netflixLi.attr('href', allServices.netflix.url);
		netflixLi.attr('target', '_blank');
		var netflixImg = $('<img>');
		netflixImg.attr('src', "./assets/logonetflix.png")
		netflixImg.addClass('streaminglogo');
        streamingServicesEl.append(netflixLi);
		netflixLi.append(netflixImg);
        console.log('run');
        console.log(allServices.netflix.url)
	}
	
	else {
		console.log('no netflix here')

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
	mainContent.attr("style","");
	var title = searchInput.val();
	getTitleId(title);
	
}
/* this lets you display the watchlist after clicking "my watchlist" which is pulled from the local storage*/
 function saveTitle(event) {
	event.preventDefault();

	let watchList
	try {
		watchList = JSON.parse(localStorage.getItem("Watch Item") || [])
	} catch (e) {
		watchList = []
	}
	
	watchList.push(movieTitleEl[0].innerText)
	localStorage.setItem("Watch Item", JSON.stringify(watchList));

	console.log('save title');
	console.log(movieTitleEl)

} 

function renderWatchListItems() {
	let wlDiv = document.getElementById("watchListDiv")
	if (wlDiv.style.display == "block") {
		wlDiv.style.display = "none"
	} else if (wlDiv.style.display == "none") {
		let wlEntries = document.getElementById("watchlistEntries");
		while (wlEntries.firstChild) {
			wlEntries.removeChild(wlEntries.firstChild)
		}
		var list = localStorage.getItem('Watch Item')
		list = JSON.parse(list)
		for (let i = 0; i < list.length; i++) {
			let el = document.createElement("p")
			el.innerText = list[i]
			wlEntries.appendChild(el)
		}
		wlDiv.style.display = "block"
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






