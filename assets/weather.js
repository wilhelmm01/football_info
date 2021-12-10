var key = "ca90b1ee3ee78f78b6f96f9d4ec5800a"
var gameForecast = document.getElementById("upcoming");





//Retreiving Weather function
function getWeatherApi() {

    //Retreiving city from clicking button
    document.getElementById("city-btn").onclick = function(place) {
        var place = document.getElementById("city").value;
        console.log("Location is " +place)


        
    //API URL
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperial&appid=" + key;
     
    console.log("API Link: " + requestURL)  
    
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then (function(data){

                //Console Logging for testing
                console.log("Current Temp " + data.main.temp + "°F" );
                console.log("Feels Like " +data.main.feels_like + "°F");
                console.log("High Temp " + data.main.temp_max + "°F");
                console.log("Low Temp " + data.main.temp_min + "°F");
                console.log ("Wind Speed " +data.wind.speed + " MPH")
                console.log ("dt " + data.dt);
                

                
                


                //Creating the elements for display
               var currentTemp = document.createElement('h3');
               currentTemp.textContent = parseInt(data.main.temp)+ "° F" ;

               var feelsLike = document.createElement('h4');
               feelsLike.textContent="Feels Like " + parseInt(data.main.feels_like) + "° F";

               var highTemp = document.createElement('p');
               highTemp.textContent="H: " + parseInt(data.main.temp_max) + "° F";

               var lowTemp = document.createElement('p');
               lowTemp.textContent="L: " + parseInt(data.main.temp_min) + "° F";

               var windSpeed = document.createElement('p');
               windSpeed.textContent="Wind: " + parseInt(data.wind.speed)  + " MPH";

                var icons = document.createElement("img")
                var conditions = data.weather[0].description;
                console.log("Conditions: " + conditions)
                
            
              gameForecast.appendChild(icons);
              gameForecast.appendChild(currentTemp);
              gameForecast.appendChild(feelsLike);
              gameForecast.appendChild(windSpeed);
              gameForecast.appendChild(highTemp);
              gameForecast.appendChild(lowTemp);

                        
        });
    }
}

getWeatherApi();

//http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1586468027&appid={API key}
