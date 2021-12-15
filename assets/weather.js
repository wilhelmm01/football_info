var key = "ca90b1ee3ee78f78b6f96f9d4ec5800a"
var gameForecast = document.getElementById("upcoming");
var weatherForecast = document.getElementById("forecast");
var currentEvent = document.getElementById("currentEvent")

//Variables for local storage
const cityList = document.querySelector("#cityList");
var cities = JSON.parse(localStorage.getItem("cities")) || [];
//Logan adding local storage for cities, creates list of each previously
cities.forEach(city => {
        const li = document.createElement('li');
        li.innerText = city;
        cityList.appendChild(li);
    })
    //Retreiving Weather function
function getWeatherApi() {

    //Retreiving city from clicking button
    document.getElementById("city-btn").onclick = function(city) {
        var city = document.getElementById("city").value;
        console.log(city)

        //Logan adding local storage for cities
        if (cities.indexOf(city) === -1) {
            cities.push(city);
        }

        localStorage.setItem('cities', JSON.stringify(cities));
        //Logan adding line to clear data after one search, appends current search to box on page
        cityList.innerHTML = ""
        cities.forEach(city => {
            const li = document.createElement('li');
            li.innerText = city;
            cityList.appendChild(li);
        })




        //Current Forecast
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

        console.log("API Link: " + requestURL)
            //Logan adding line to clear data after one search
        gameForecast.innerHTML = "";

        fetch(requestURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {

                //Console Logging for testing
                //console.log("Current Temp " + data.main.temp + "°F" );
                //console.log("Feels Like " +data.main.feels_like + "°F");
                //console.log("High Temp " + data.main.temp_max + "°F");
                //console.log("Low Temp " + data.main.temp_min + "°F");
                //console.log ("Wind Speed " +data.wind.speed + " MPH")
                console.log("dt " + data.dt);



                //Date info
                var dateResponse = (data.dt);
                var date = new Date(0);
                date.setUTCSeconds(dateResponse);
                var d = date;
                console.log("date " + d);
                var dOutput = d.getFullYear();
                console.log(" date updated" + dOutput);
                var monthOutput = d.getMonth() + 1;
                console.log(monthOutput);
                var dayOutput = d.getDate();
                console.log(dayOutput);



                //Creating the elements for display

                var currentDate = document.createElement('h2');
                currentDate.textContent = monthOutput + "/" + dayOutput + "/" + dOutput;

                var currentTemp = document.createElement('h3');
                currentTemp.textContent = parseInt(data.main.temp) + "° F";

                var feelsLike = document.createElement('h4');
                feelsLike.textContent = "Feels Like " + parseInt(data.main.feels_like) + "° F";

                var highTemp = document.createElement('p');
                highTemp.textContent = "H: " + parseInt(data.main.temp_max) + "° F";

                var lowTemp = document.createElement('p');
                lowTemp.textContent = "L: " + parseInt(data.main.temp_min) + "° F";

                var windSpeed = document.createElement('p');
                windSpeed.textContent = "Wind: " + parseInt(data.wind.speed) + " MPH";

                //var icons = document.createElement("img")
                var conditions = data.weather[0].description;
                console.log("Conditions: " + conditions)

                var lat = (data.coord.lat);
                var lon = (data.coord.lon);

                console.log(lat);
                console.log(lon);



                gameForecast.appendChild(currentDate);
                gameForecast.appendChild(currentTemp);
                gameForecast.appendChild(feelsLike);
                gameForecast.appendChild(windSpeed);
                gameForecast.appendChild(highTemp);
                gameForecast.appendChild(lowTemp);




                var requestURL2 = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&sort=date,asc&city=" + city + "&apikey=aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT";
                      // console.log("API Link: " + requestURL)  
                    fetch(requestURL2)
                    
                        .then(function (response) {
                            console.log(response)
                            return response.json();
                        })
                        .then (function(data){
                            var events = data._embedded.events;
                            // console.log(data);

                            for (var i=0; i < events.length ; i++) {

                            //     var data = data.length
                        
                                  //Creating the elements for display
                            var eventName = document.createElement('p');
                            eventName.textContent =(data._embedded.events[i].name);
                            
                            var startTime = document.createElement('p');
                            startTime.textContent=(data._embedded.events[i].dates.start.localTime);
                            
                            var date = document.createElement('p');
                            date.textContent=(data._embedded.events[i].dates.start.localDate);
                            
                            currentEvent.appendChild(eventName);
                            currentEvent.appendChild(startTime);
                            currentEvent.appendChild(date);
                            // currentEvent.appendChild(time);
                        }
                    });




                //5-day forecast        
                var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + key;
                fetch(forecastURL)
                    .then(function(response) {
                        return response.json();

                    })
                    .then(function(response) {
                        console.log("dt" + response.daily[0].dt);
                        //Logan adding line to clear data after one search
                        weatherForecast.innerHTML = "";

                        for (var i = 1; i < 8; i++) {
                            var futureDateResponse = (response.daily[i].dt);
                            var forecastDate = new Date(i);
                            forecastDate.setUTCSeconds(futureDateResponse);
                            var futureDate = forecastDate;
                            var forecastMonth = futureDate.getMonth()+1;
                            var forecastDay = futureDate.getDate();
                            var forecastYear = futureDate.getFullYear();

                            var fdOutput = forecastMonth + "/" + forecastDay + "/" + forecastYear

                            var fiveDay = document.createElement("div");
                            fiveDay.classList.add("card")
                            fiveDay.textContent=fdOutput
                            weatherForecast.appendChild(fiveDay);
                
                 var highForecast=document.createElement("h3");
               highForecast.textContent ="High Temp: " + parseInt(response.daily[i].temp.max)+ "° F" ;

               var lowForecast = document.createElement("h3");
               lowForecast.textContent ="Low Temp: " + parseInt(response.daily[i].temp.min)+ "° F";

               var forecastDescription = document.createElement("p");
               forecastDescription.textContent = (response.daily[i].weather[0].description);


                fiveDay.appendChild(highForecast);
                fiveDay.appendChild(lowForecast);
                fiveDay.appendChild(forecastDescription);
                console.log(fdOutput);
                console.log( "High temp " + response.daily[i].temp.max)
                console.log("low temp " +response.daily[i].temp.min );
                console.log("description " + response.daily[i].weather[0].description)

                            
                        }

                    })
            });

    }
} //5 day forecase

// var requestURL3 = "https://app.ticketmaster.com/discovery/v2/events.json?size=3&sort=date,asc&startDateTime=" +dt +"&city=" + city + "&apikey=aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT";
// // console.log("API Link: " + requestURL)  
// fetch(requestURL3)

// .then(function (response) {
//     console.log(response)
//     return response.json();
// })
// .then (function(data){
//     var ftrEvents = data._embedded.events;
//       // console.log(data);

//     for (var i=0; i < ftrEvents.length ; i++) {

//       //     var data = data.length

//             //Creating the elements for display
//     var eventName = document.createElement('p');
//     eventName.textContent =(data._embedded.events[i].name);
    
//     var startTime = document.createElement('p');
//     startTime.textContent=(data._embedded.events[i].dates.start.localTime);
    
//     var date = document.createElement('p');
//     date.textContent=(data._embedded.events[i].dates.start.localDate);
    
//     currentEvent.appendChild(eventName);
//     currentEvent.appendChild(startTime);
//     currentEvent.appendChild(date);
//       // currentEvent.appendChild(time);
// }
// }
// )

getWeatherApi();






//http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1586468027&appid={API key}

//var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&exclude=hourly&appid=" + key;