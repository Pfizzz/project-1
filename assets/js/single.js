var moviesList = [];

var loadMovies = function(){
    moviesList = JSON.parse(localStorage.getItem("movieList"));
    console.log(moviesList);
};

loadMovies();