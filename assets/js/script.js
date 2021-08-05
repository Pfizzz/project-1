//movie section global variables
var movieSearchEl = $("#generate-movie-btn");
var genreId = 0;
var moviesList = [];
var user_location;
var checkboxes = [];

//choose movie genre button click
$(document).ready(function () {
  document.querySelector(".error").style.display = "none";
  navigator.geolocation.getCurrentPosition(showPosition);

  $("#generate-movie-btn").click(function () {
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
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
};
//use checkbox data to insert genre into api search
var getGenre = function (genreId) {
  // debugger;
  var id = 0;
  console.log(id);
  //change the value of genreId based on which checkbox is clicked
  if ($("#action").is(":checked")) {
    id = 28;
    getMovies(id);
  }
  if ($("#adventure").is(":checked")) {
    id = 12;
    getMovies(id);
  }
  if ($("#comedy").is(":checked")) {
    id = 35;
    getMovies(id);
  }
  if ($("#horror").is(":checked")) {
    id = 27;
    getMovies(id);
  }
  if ($("#drama").is(":checked")) {
    id = 18;
    getMovies(id);
  }
  if ($("#romance").is(":checked")) {
    id = 10749;
    getMovies(id);
  }
  if ($("#scifi").is(":checked")) {
    id = 878;
    getMovies(id);
  }
  if ($("#family").is(":checked")) {
    id = 10751;
    getMovies(id);
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
  for (var i = 0; i < 7; i++) {
    moviesList.push({
      title: data.results[i].title,
      link: data.results[i].streamingInfo.netflix.us,
      year: data.results[i].year,
      coverSM: data.results[i].posterURLs[185],
      coverMD: data.results[i].posterURLs[342],
      coverLG: data.results[i].posterURLs[500],
      runtime: data.results[i].runtime,
      overview: data.results[i].overview,
    });
  }
  console.log(moviesList);
  saveMovies();
};
    
var saveMovies = function(){
    localStorage.setItem("movieList", JSON.stringify(moviesList));
};
