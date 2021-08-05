var moviesList = [];
var restaurantsList = [];
var movieChoiceEl = document.querySelector("#movie-choice");
var restChoiceEl = document.querySelector("#dining-choice");

var loadMovies = function(){
    moviesList = JSON.parse(localStorage.getItem("movieList"));
    console.log(moviesList);
};

var loadRestaurants = function(){
    restaurantsList = JSON.parse(localStorage.getItem("restaurantList"));
    console.log(restaurantsList);
};

loadMovies();
loadRestaurants();

var displayMovies = function(moviesList){
    movieChoiceEl.innerHTML = "";

    if(!moviesList){
        movieChoiceEl.textContent = "No Movies Searched";
    };
        for(var i=0; i<moviesList.length; i++){
            var title= document.createElement("h3");
            var coverEl = document.createElement("h3");
            var coverImg= document.createElement("img");
            var year= document.createElement("p");
            var link = document.createElement("p");
            var hyperLink = document.createElement("a");
            var runtime= document.createElement("p");

            title.textContent = moviesList[i].title;
            coverImg.setAttribute("src", moviesList[i].coverSM);
            coverEl.appendChild(coverImg);

            year.textContent = moviesList[i].year;
            runtime.textContent = moviesList[i].runtime + " Minutes";

            hyperLink.setAttribute("href", moviesList[i].link.link);
            hyperLink.textContent = "Watch Movie Here";
            link.appendChild(hyperLink);

            var movieEl = document.createElement("div");
            movieEl.appendChild(coverEl);
            movieEl.appendChild(title);
            movieEl.appendChild(year);
            movieEl.appendChild(runtime);
            movieEl.appendChild(link);
            movieChoiceEl.appendChild(movieEl);
        }

};

var displayDining = function(restaurantsList){
    restChoiceEl.innerHTML = "";

    if(!restaurantsList){
        restChoiceEl.textContent = "No Restaurants Searched";
    }
    else{
        for(var i = 0; i<restaurantsList.length; i++){
            var restaurantName = document.createElement("h3");
            var restaurantAdress= document.createElement("p");
            var restaurantPhone= document.createElement("p");

            restaurantName.textContent = restaurantsList[i].restaurant_name;
            restaurantAdress.textContent = restaurantsList[i].address;
            restaurantPhone.textContent = restaurantsList[i].restaurant_phone;

            var restaurantEl= document.createElement("div");
            restaurantEl.appendChild(restaurantName);
            restaurantEl.appendChild(restaurantAdress);
            restaurantEl.appendChild(restaurantPhone);
            restChoiceEl.appendChild(restaurantEl);
            console.log(restaurantEl);
        }
    };
    
};


displayMovies(moviesList);
displayDining(restaurantsList);