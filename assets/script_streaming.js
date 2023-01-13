var streamingServicesEl = $('#streamingServices');
apiUrlStreaming = 'https://api.themoviedb.org/3/'
apiKeyTMDB = '840b0e9fd24a9f575605a19d49ff9d2c'



function getTMDBId(imdbId) {
	
	url = apiUrlStreaming + 'find/' + imdbId + '?api_key=' + apiKeyTMDB + '&language=en-US&external_source=imdb_id'
	
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
		
    })
	.then(function(data) {
		console.log(data);
        getStreamingServices(data.movie_results[0].id);
        
		
		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}



function getStreamingServices(TMDBId) {

    url = apiUrlStreaming + 'movie/' + TMDBId + '/watch/providers?api_key=' + apiKeyTMDB 
	
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
		
    })
	.then(function(data) {
		console.log(data);
        grabServices(data);
        
		
		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}





