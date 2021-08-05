var moviesList = [];
var restaurantsList = [];

var loadMovies = function(){
    moviesList = JSON.parse(localStorage.getItem("movieList"));
    console.log(moviesList);
};

var loadMovies = function(){
    restaurantsList = JSON.parse(localStorage.getItem("restaurantList"));
    console.log(restaurantsList);
};

loadMovies();