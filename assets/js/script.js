//movie section global variables
var movieSearchEl = $("#generate-movie-btn");
var movieChoicesEl = document.querySelector("#movie-results");
var restChoicesEl = document.querySelector("#dining-results");
var genreId = 0;
var moviesList = [];
var user_location;
var checkboxes = [];
var restaurantsList = [];
// function to reveal hidden divs for + buttons
function showhide(id) {
  var e = document.getElementById(id);
  e.style.display = (e.style.display == 'block') ? 'none' : 'block';
}


//choose movie genre button click
$(document).ready(function () {
  document.querySelector(".error").style.display = "none";
  navigator.geolocation.getCurrentPosition(showPosition);

  $("#generate-movie-btn").click(function () {
    // debugger;
    //run getGenre function to change the api url to fetch data based on the users choice.
    getGenre(genreId);
  });
  $("#food-form-btn").click(function () {
    getFood();
  });
});

var showPosition = function (position) {
  user_location = position.coords;
};

var getFood = function () {
  checkboxes = $(".checkbox");
  var len = checkboxes.length;
  var checked_checkbox = [];
  var temp_len = 0;
  for (var el of checkboxes) {
    if (el.checked == false) {
      temp_len++;
    } else {
      checked_checkbox.push(el.id);
    }
  }
  if (temp_len == len) {
    document.querySelector(".error").style.display = "block";
    return;
  }

  document.querySelector(".error").style.display = "none";
  if(user_location){
  for (var el of checked_checkbox) {
    fetch(
      `https://api.documenu.com/v2/restaurants/search/geo?lat=${user_location.latitude}&lon=${user_location.longitude}&distance=5&cuisine=${el}&fullmenu`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "4fea245c4d54067bed8f335497684c7f",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data.sort(() => Math.random() - Math.random()).slice(0, 5));
    
    })
  }
}
};
var receiveRestaurantData = function(data){
  console.log(data);
  for(var i = 0; i < 5; i++){
    restaurantsList.push({
      restaurant_name: data.data[i].restaurant_name,
      restaurant_phone: data.data[i].restaurant_phone,
      address: data.data[i].address.formatted,
      menu: data.data[i].menus
    });
  }
  console.log(restaurantsList);
  saveRestaurants();
  displayDining(restaurantsList);
};



//use checkbox data to insert genre into api search
var getGenre = function (genreId) {
  
//generate random page number
function generatePage (min, max) {
  var page = Math.floor(Math.random() * (max - min + 1) + min);
  return page;
};

  var id = 0;
  var page = 1;
  //change the value of genreId based on which checkbox is clicked
  if ($("#action").is(":checked")) {
    id = 28;
    page = generatePage(1, 36);
    getMovies(id, page);
  }
  if ($("#adventure").is(":checked")) {
    id = 12;
    generatePage(1, 28);
    getMovies(id, page);
  }
  if ($("#comedy").is(":checked")) {
    id = 35;
    generatePage(1, 87);
    getMovies(id, page);
  }
  if ($("#horror").is(":checked")) {
    id = 27;
    generatePage(1, 14);
    getMovies(id, page);
  }
  if ($("#drama").is(":checked")) {
    id = 18;
    generatePage(1, 84);
    getMovies(id, page);
  }
  if ($("#romance").is(":checked")) {
    id = 10749;
    generatePage(1, 20);
    getMovies(id, page);
  }
  if ($("#scifi").is(":checked")) {
    id = 878;
    generatePage(1, 8);
    getMovies(id, page);
  }
  if ($("#family").is(":checked")) {
    id = 10751;
    generatePage(1, 18);
    getMovies(id, page);
  }
};

var getMovies = function (genreId, page) {
  //fetch movie api information
  fetch(
    "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=" +
      genreId +
      "&page=" + page + "&language=en",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "52418e293amsh3c28249d07dbf86p11787ejsn25c24e4b2347",
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      receiveMovieData(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

var receiveMovieData = function (data) {
  for (var i = 0; i < 5; i++) {
    moviesList.push({
      title: data.results[i].title,
      link: data.results[i].streamingInfo.netflix.us,
      year: data.results[i].year,
      coverSM: data.results[i].posterURLs[185],
      coverMD: data.results[i].posterURLs[342],
      coverLG: data.results[i].posterURLs[500],
      runtime: data.results[i].runtime,
      overview: data.results[i].overview
    });
  }
  console.log(moviesList);
  saveMovies();
  displayMovies(moviesList);
};
    
var saveMovies = function(){
    localStorage.setItem("movieList", JSON.stringify(moviesList));
};

var saveRestaurants = function(){
  localStorage.setItem("restaurantList", JSON.stringify(restaurantsList));
};

var displayMovies = function(moviesList){
  movieChoicesEl.innerHTML = "";

  if(!moviesList){
      movieChoicesEl.textContent = "No Movies Searched";
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
          
          var movieOption = document.createElement("label");
          movieOption.setAttribute("for", "action");

          var movieOptionInput = document.createElement("input");
          movieOptionInput.setAttribute("type", "radio");
          movieOptionInput.setAttribute("id", "movie"+i);

          movieEl.appendChild(coverEl);
          movieEl.appendChild(title);
          movieEl.appendChild(year);
          movieEl.appendChild(runtime);
          movieEl.appendChild(link);
          movieOption.appendChild(movieOptionInput);
          movieOption.appendChild(movieEl);
          movieChoicesEl.appendChild(movieOption);
      }

};

var displayDining = function(restaurantsList){
  restChoicesEl.innerHTML = "";

  if(!restaurantsList){
      restChoicesEl.textContent = "No Restaurants Searched";
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

          var diningOption = document.createElement("label");
          diningOption.setAttribute("for", "action");

          var diningOptionInput = document.createElement("input");
          diningOptionInput.setAttribute("type", "radio");
          diningOptionInput.setAttribute("id", "restaurant"+i);
          
          restaurantEl.appendChild(restaurantName);
          restaurantEl.appendChild(restaurantAdress);
          restaurantEl.appendChild(restaurantPhone);
          diningOption.appendChild(diningOptionInput);
          diningOption.appendChild(restaurantEl);
          restChoicesEl.appendChild(diningOption);
          
      }
  };
  
};