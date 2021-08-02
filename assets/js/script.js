//movie section global variables
var genreId = ""

//fetch movie api information
fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=" 18 "&page=1&language=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "52418e293amsh3c28249d07dbf86p11787ejsn25c24e4b2347",
		"x-rapidapi-host": "streaming-availability.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

//use checkbox data to insert genre into api search
if ($('#action').is(':checked')) {
    genreId = "28";
}
if ($('#adventure').is(':checked')) {
    genreId = "12";
}
if ($('#comedy').is(':checked')) {
    genreId = "35";
}
if ($('#horror').is(':checked')) {
    genreId = "27";
}
if ($('#drama').is(':checked')) {
    genreId = "18";
}
if ($('#romance').is(':checked')) {
    genreId = "10749";
}
if ($('#scifi').is(':checked')) {
    genreId = "878";
}
if ($('#family').is(':checked')) {
    genreId = "10751";
} else {
    alert('You must select a movie Genre!');
}


