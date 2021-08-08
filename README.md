# &Chill
 
  <p align="center">
  <img width="200" src="https://github.com/Pfizzz/project-1/blob/fbb2eea178e5b8f86f18b59d77f4855f38feef74/assets/images/logo.png" alt="&Chill logo">
</p>

<p align="center">A date night companion app. </p>
<p align="center">
<img src="https://github.com/Pfizzz/project-1/blob/fbb2eea178e5b8f86f18b59d77f4855f38feef74/assets/images/Demo.gif">
</p> 

## Live Links:
* Deployed: https://pfizzz.github.io/project-1/
* GitHub repo: https://github.com/Pfizzz/project-1

## “I don’t know, what do YOU want to watch? ...And what are we eating?”

Sounds familiar? You’re not alone. Millions of Americans face the same unending barrage of options when planning their dinner and movie nights. Couples argue, friends get nowhere, and single viewers wind up with an empty belly and a blank screen. Thousands of available titles? Dozens of local restaurants? Let's help you narrow things down.

Introducing &Chill - An intuitive, mobile-first, curiosity-driven app that helps you plan your night.

Because sometimes you gotta keep it simple.

## Concept

* “&Chill” is a simple app designed to help indecisive people plan their evenings. The app has three core components: the movie section, the dining section, and the itinerary. 
* The layout is supposed to be simple and mobile-friendly. After the user clicks the "+" to expand the movie section, they select a genre and add it.
* In the dining section, the user types in their town and state, checks off a type of cuisine, and adds it.
* Bringing it all together is the itinerary, which is generated on a separate, printer-friendly page. There, the user can browse 5 randomly-generated media results and 5 local resturants. They can proceed to Netflix from the website and view the restuarant's menu in a modal within the page.

## User Story

AS A user who cannot pick a movie and meal </br>
I WANT to browse movies by genre and view local restaurants </br>
SO THAT I can create an itinerary for the evening.

## Process

### Technologies used:
<a href="https://materializecss.com/">Materialize CSS</a></br>
<a href="https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/details">Streaming Availability</a></br>
<a href="https://www.programmableweb.com/api/documenu#:~:text=Documenu%20is%20a%20US%20Restaurant%20Menu%20API.%20It,other%20day.%20So%20the%20data%20is%20always%20fresh">Documenu</a>

### Breakdown of Roles:

* Umair Ali- docuMenu API research, API programming, javaScript
* Chase Brackeen- movie API research, API programming, javaScript
* Justin Perez- localStorage, dynamic HTML programming, javaScript
* Michael Pfister- HTML/CSS, Materialize framework, presentation

## Mechanics and Reflections, in the words of our developers:

* Michael: "Generally, the project in its current state resembles our intention, but we had to make several concessions. We kept the original responsive design, but in our first draft, both of the columns were symmetrical, complete with matching search fields, buttons, and icons. Due to the limits of our API, however, we had to remove the search feature from the movies section and replace a field of checkboxes with radio button. We also had to remove the search button from the restaurant section, as API limitations forced us to rethink and restructure certain components of the webpage. We believe that we had a home-run idea, hashed it out, did our research, accepted our limitations both technologically and chronologically, and came out with a sleek, functioning app. If we had more time, we would have added more to the UI, rather than subtracting."

* Chase: "In the movie section of the website we have created an area for the user to choose a movie genre which will generate a list of 5 movies from a random page number in the selected genre. Each movie is saved into an object with data that we determined would be most useful to the end user which would be appended to the landing page. Our original goal was to allow the user to choose from a list of streaming services and a list of movie genres to generate a list of random movies to fit their criteria. Unfortunately due to the nature of the limited capabilities in the free version of the API this was not entirely possible. In the event that we were to bring this website live we would only need to make minor adjustments to the code to allow these original goals to be met upon paying for the premium version of the API."

* Justin: "After the user submits the genre of movie they want as well as the restaurant type, they would like to search for, by clicking generate plan they can get a few results of both movies and restaurants that they may be interested in. This is done by combining the results of the api functions and functions utilizing localStorage. We created empty arrays at the top of script.js to allow for object data to eventually be stored there for the movies and restaurants. Then utilizing specific information from the data in the apis, we store that as objects in those empty arrays. To have the information we got load on the next page, first we use localStorage save functions to stringify the data. Then, we load the data into empty arrays in the single.js file, which is what is loaded on the results page. From there, we iterate through each array separately, creating divs that will display the data we stored. For movies, we displayed the title, a poster, runtime, and a link on where to watch. For restaurants we displayed the name, phone number, address, as well as implemented a modal button that shows off the menu."

* Umair: "We used google maps API to get longitude and latitude for the city, the Documenu Api to return restaurants’ name, website, phone number and the menu. Moreover, we used a ‘for of’ loop to iterate over the checked boxes. Furthermore, we made a modal to display menus with its price.
The project demanded great effort and turned us into insomniacs, but we believe that good things come to those who diligently work towards their goal. We have learned a lot working on this project, which revealed issues of great complexity to us. We were sometimes stuck due to lack of knowledge/practice in frontend programming; however, with the help of our group members and other resources we can proudly say that we made it."

