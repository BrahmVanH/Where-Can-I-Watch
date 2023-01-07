const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f2ea17a6acmsh4f572836b3c38cfp1bc551jsn18c7caf478be',
		'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
	}
};

const searchTitle = document.getElementById('#searchInput')

fetch('https://netflix54.p.rapidapi.com/search/?query=' + searchTitle + '&offset=0&limit_titles=25&limit_suggestions=10&lang=en', options)
	.then(response) {
        response.json();
    } 
	.then(response) {
        console.log(response);
    } 
	.catch(err) {
        console.error(err);
    }