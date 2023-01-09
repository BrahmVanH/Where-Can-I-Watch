var searchBtn = document.getElementById('searchBtn');
var searchInput = document.getElementById('searchInput');


function searchSubmit(event) {

	event.preventDefault();
	var title = searchInput.value.trim();
	getTitleId(title);
	
	

}



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


function createMovieCard() {
	var movieResults = document.getElementById('movieResults');
	
	var title = document.createElement('p');
	var year = document.createElement('p');
	var rating = document.createElement('p');
	var genre = document.createElement('p');
	var synopsis = document.createElement('p');
	var image = document.createElement('img');

	title.setAttribute('id', 'movieTitle');
	year.setAttribute('id', 'movieYear');
	rating.setAttribute('id', 'movieRating');
	genre.setAttribute('id', 'movieGenre');
	synopsis.setAttribute('id', 'movieSynopsis');
	image.setAttribute('id', "movieImage");
	image.setAttribute('alt', "Image from cover of movie");

	
	movieResults.appendChild(title);
	movieResults.appendChild(year);
	movieResults.appendChild(rating);
	movieResults.appendChild(genre);
	movieResults.appendChild(synopsis);
	movieResults.appendChild(image);
	
	

	
	
	
	
}

function populateMovieCard(data) {

	createMovieCard();

	var title = document.getElementById('movieTitle');
	var year = document.getElementById('movieYear');
	var rating = document.getElementById('movieRating');
	var genre = document.getElementById('movieGenre');
	var synopsis = document.getElementById('movieSynopsis');
	var image = document.getElementById('movieImage');
	
	title.textContent = data.fullTitle
	year.textContent = data.year
	rating.textContent = data.contentRating
	genre.textContent = data.genres;
	synopsis.textContent = data.plot;
	image.src = data.imgage
	
	
	
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


searchBtn.addEventListener('click', searchSubmit)

/* Title data.results[0].title
Year data.results[0].year
Rating data.results[0].rating
Genre data.results[0].title_type
Synopsis data.results[0].synopsis
Image data.results[0].img


*/