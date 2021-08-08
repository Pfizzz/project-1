//movie section global variables
var movieSearchEl = $("#generate-movie-btn");
var genreId = 0;
var moviesList = [];
var user_location;
var radioboxes = [];
var restaurantsList = [];
// function to reveal hidden divs for + buttons
function showhide(id) {
  var e = document.getElementById(id);
  e.style.display = (e.style.display == 'block') ? 'none' : 'block';
}


//choose movie genre button click
$(document).ready(function () {
  document.querySelector(".error").style.display = "none";
  localStorage.removeItem("restaurantList")
   
  $("#generate-movie-btn").click(function () {
    //run getGenre function to change the api url to fetch data based on the users choice.
    getGenre(genreId);
  });
  $("#food-form-btn").click(function () {
    var city=document.getElementById('dining-text-area').value;
    if(document.getElementById('dining-text-area').value!=""){
    var address = city;
  var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
	var lat = results[0].geometry.location.lat();
	var lng = results[0].geometry.location.lng();
	console.log(lat, lng);
  if(lat && lng) {
    getFood(lat,lng);
  }
  })
}
  });
});


var getFood = function (latitude,longitude) {
  radioboxes = $(".radiobox");
  var len = radioboxes.length;
  var checked_radiobox;
  var temp_len = 0;
  for (var el of radioboxes) {
    if (el.checked == false) {
      temp_len++;
    } else {
      checked_radiobox= el.id;
    }
  }
  console.log(checked_radiobox)
  if (temp_len == len) {
    document.querySelector(".error").style.display = "block";
    return;
  }

  document.querySelector(".error").style.display = "none";
  restaurantsList=[];
    fetch(
      `https://api.documenu.com/v2/restaurants/search/geo?lat=${latitude}&lon=${longitude}&distance=5&cuisine=${checked_radiobox}&fullmenu`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "4fea245c4d54067bed8f335497684c7f",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        var data = response.data.sort(() => Math.random() - Math.random()).slice(0, 5);
        if(data.length>0){
        receiveRestaurantData(data,checked_radiobox);
        }
    })
  

};
var receiveRestaurantData = function(data,cuisine){
  for(var i = 0; i < 5; i++){
    restaurantsList.push({
      restaurant_name: data[i].restaurant_name,
      restaurant_phone:data[i].restaurant_phone,
      address: data[i].address.formatted,
      menu: data[i].menus,
      cuisine:cuisine
    });
  }
  console.log(restaurantsList);
  saveRestaurants();
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
      page = generatePage(1, 28);
      getMovies(id, page);
    }
    if ($("#comedy").is(":checked")) {
      id = 35;
      page = generatePage(1, 87);
      getMovies(id, page);
    }
    if ($("#horror").is(":checked")) {
      id = 27;
      page = generatePage(1, 14);
      getMovies(id, page);
    }
    if ($("#drama").is(":checked")) {
      id = 18;
      page = generatePage(1, 84);
      getMovies(id, page);
    }
    if ($("#romance").is(":checked")) {
      id = 10749;
      page = generatePage(1, 20);
      getMovies(id, page);
    }
    if ($("#scifi").is(":checked")) {
      id = 878;
      page = generatePage(1, 8);
      getMovies(id, page);
    }
    if ($("#family").is(":checked")) {
      id = 10751;
      page = generatePage(1, 18);
      getMovies(id, page);
    }
  };

var getMovies = function (genreId) {
  //fetch movie api information
  fetch(
    "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=" +
      genreId +
      "&page=1&language=en",
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
};
    
var saveMovies = function(){
    localStorage.setItem("movieList", JSON.stringify(moviesList));
};

var saveRestaurants = function(){
  localStorage.setItem("restaurantList", JSON.stringify(restaurantsList));
};