const trendingCard1 = $('#trendingCard-1')
const trendingCard2 = $('#trendingCard-2')
const trendingCard3 = $('#trendingCard-3')
const trendingCard4 = $('#trendingCard-4')
const trendingCard5 = $('#trendingCard-5')
const trending1Title = $('#trending-1-title');
const trending2Title = $('#trending-2-title');
const trending3Title = $('#trending-3-title');
const trending4Title = $('#trending-4-title');
const trending5Title = $('#trending-5-title');
const trendSearch1 = $('#trendingSearch1');
const trendSearch2 = $('#trendingSearch2');
const trendSearch3 = $('#trendingSearch3');
const trendSearch4 = $('#trendingSearch4');
const trendSearch5 = $('#trendingSearch5');
const trendImage1 = $('#trending-1-image');
const trendImage2 = $('#trending-2-image');
const trendImage3 = $('#trending-3-image');
const trendImage4 = $('#trending-4-image');
const trendImage5 = $('#trending-5-image');
const trendingTitlesEl = $('#trendingTitles')


const API_URL_TRENDING = 'https://api.themoviedb.org/3/trending/';
const API_KEY_TMDB = '840b0e9fd24a9f575605a19d49ff9d2c';
const API_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';




function getTrendingFive() {

	url = API_URL_TRENDING + 'movie/week?api_key=' + API_KEY_TMDB;


	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);

    })
	.then(function(data) {
		console.log('TOP 5', data)
        populateTrending(data);


    })
	.catch(function(err) {
		console.error(err);
    })

}


function populateTrending(trending) {
	console.log("HIT***")

	// Set title for each trending item
	trending1Title.text(trending.results[0].original_title);
	trending2Title.text(trending.results[1].original_title);
	trending3Title.text(trending.results[2].original_title);
	trending4Title.text(trending.results[3].original_title);
	trending5Title.text(trending.results[4].original_title);

	// Set image src for each trending item
    trendImage1.attr('src', API_IMAGE_BASE_URL  + trending.results[0].poster_path);
	trendImage2.attr('src', API_IMAGE_BASE_URL  + trending.results[1].poster_path);
	trendImage3.attr('src', API_IMAGE_BASE_URL  + trending.results[2].poster_path);
	trendImage4.attr('src', API_IMAGE_BASE_URL  + trending.results[3].poster_path);
	trendImage5.attr('src', API_IMAGE_BASE_URL  + trending.results[4].poster_path);


	
	
	
	
	
}



	trendSearch1.on('click', getTitleId(trending1Title.text));
	//trendSearch2.on('click', getTitleId(trending.results[1].original_title));
	//trendSearch3.on('click', getTitleId(trending.results[2].original_title));
	//trendSearch4.on('click', getTitleId(trending.results[3].original_title));
	//trendSearch5.on('click', getTitleId(trending.results[4].original_title));





	
	




getTrendingFive();




