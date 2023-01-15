var trend1 = $('#trending-1');
var trend2 = $('#trending-2');
var trend3 = $('#trending-3');
var trend4 = $('#trending-4');
var trend5 = $('#trending-5');
var trendImage1 = $('#trending-1-image');
var trendImage2 = $('#trending-2-image');
var trendImage3 = $('#trending-3-image');
var trendImage4 = $('#trending-4-image');
var trendImage5 = $('#trending-5-image');
apiUrlTrending = 'https://api.themoviedb.org/3/trending/'
apiKeyTMDB = '840b0e9fd24a9f575605a19d49ff9d2c'


function getTrendingFive() {
	
	url = apiUrlTrending + 'movie/week?api_key=' + apiKeyTMDB
	
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
		
    })
	.then(function(data) {
		console.log('top 5' + data);
        populateTrending(data);
		
		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}


function populateTrending(trending) {

    trend1.text(trending.results[0].original_title);
    trend2.text(trending.results[1].original_title);
    trend3.text(trending.results[2].original_title);
    trend4.text(trending.results[3].original_title);
    trend5.text(trending.results[4].original_title);



    
    
}
getTrendingFive();



