var moviesList = [];
var restaurantsList = [];
var movieChoiceEl = document.querySelector("#movie-choice");
var restChoiceEl = document.querySelector("#dining-choice");
$('#modal1').modal();

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
            var cuisine= document.createElement("p");
            var button = document.createElement("div")
            button.innerHTML=`
            <a class="waves-effect waves-light btn-large purple btn modal-trigger" id="menu-${i}" data-menu='${i}' href="#modal1" onclick="$('#modal1').modal('open');modal_menu(${i})">Menu</a>`

            restaurantName.textContent = restaurantsList[i].restaurant_name;
            restaurantAdress.textContent = restaurantsList[i].address;
            restaurantPhone.textContent = restaurantsList[i].restaurant_phone;
            cuisine.textContent = restaurantsList[i].cuisine;

            var restaurantEl= document.createElement("div");
            restaurantEl.appendChild(restaurantName);
            restaurantEl.appendChild(restaurantAdress);
            restaurantEl.appendChild(restaurantPhone);
            restaurantEl.appendChild(cuisine)
            restaurantEl.appendChild(button)
            restChoiceEl.appendChild(restaurantEl);
        }
    };
    
};

function modal_menu(id){
    var data = restaurantsList[id].menu;
    $("#modal-body").html("")
    data.forEach(element => {
        console.log(element)
        $("#modal-body").append(`
        <h4 class="center">${element.menu_name}</h4>
        <br/>
        `)
        element.menu_sections.forEach((item,index)=>{
            $("#modal-body").append(`
             <h5 class="center">${index+1} ${item.section_name}</h5>
             <p class="center">${item.description}</p>
             <br/>
             
            `) 
             item.menu_items.forEach((food,index2)=>{
               $("#modal-body").append(`
               <div class="row">
               <div class="col s2">${index2+1}</div>
               <div class="col s4">${food.name}</div>
               <div class="col s4">${food.description}</div>
               <div class="col s2">$ ${food.price}</div>
               </div>

               `)  
             }) 
        })
        
        
    });
}

displayMovies(moviesList);
displayDining(restaurantsList);