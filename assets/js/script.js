//movie section global variables
var movieSearchEl = $('#generate-movie-btn');
var genreId = 0;


//choose movie genre button click
$(document).ready(function() {
    $("#generate-movie-btn").click(function(){
        //run getGenre function to change the api url to fetch data based on the users choice.
        getGenre(genreId);
    }); 
});

//use checkbox data to insert genre into api search
var getGenre = function(genreId) {
    var id = genreId;
    console.log(id);
    //change the value of genreId based on which checkbox is clicked
    if ($('#action').is(':checked')) {
       id = 28;
       getMovies(genreId);
    }
    if ($('#adventure').is(':checked')) {
       id = 12;
       getMovies(genreId);
    }
    if ($('#comedy').is(':checked')) {
       id = 35;
       getMovies(genreId);
    }
    if ($('#horror').is(':checked')) {
       id = 27;
       getMovies(genreId);
    }
    if ($('#drama').is(':checked')) {
       id = 18;
       getMovies(genreId);
    }
    if ($('#romance').is(':checked')) {
       id = 10749;
       getMovies(genreId);
    }
    if ($('#scifi').is(':checked')) {
       id = 878;
       getMovies(genreId);
    }
    if ($('#family').is(':checked')) {
       id = 10751;
       getMovies(genreId);
    } 
}


var getMovies = function (genreId) {
    //fetch movie api information
    fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=" + genreId + "&page=1&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "52418e293amsh3c28249d07dbf86p11787ejsn25c24e4b2347",
            "x-rapidapi-host": "streaming-availability.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(genreId);
        })
        .catch(err => {
            console.error(err);
        });
}
