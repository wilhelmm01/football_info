//weather API - 
// ApiKeyAuth.apiKey = "aef20bc076b6576a68a8168ed03dc6dc";
// Ticketmaster apiKey = "aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT"


    fetch("https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=Columbus&apikey=aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT")
    .then(resp => resp.json())
    .then( json => console.log(json))

    var key = "aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT"
    var eventForecast = document.getElementById("upcoming");
    
    
    function getEventApi() {
    
        //Retreiving city from clicking button
        document.getElementById("city-btn").onclick = function(place) {
            var place = document.getElementById("city").value;
            console.log("Location is " + place)
            
        //API URL
        var requestURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=" + place + "&apikey=aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT";
        
        // console.log("API Link: " + requestURL)  
        
        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then (function(data){
    
                    //Console Logging for testing
                    console.log("Event " + data._embedded.events[0].name);
                    console.log("Date " + data._embedded.events[0].dates.start.localDate);
                    console.log("Time " + data._embedded.events[0].dates.start.localTime);
    
                    //Creating the elements for display
                var eventName = document.createElement('h3');
                eventName.textContent =(data._embedded.events[0].name);
    
                var date = document.createElement('p');
                date.textContent=(data._embedded.events[0].dates.start.localDate);

                var time = document.createElement('p');
                date.textContent=(data._embedded.events[0].dates.start.localTime);

                // for (let i = 0; i < events.length; i++) {
                
                
                    eventForecast.appendChild(eventName);
                eventForecast.appendChild(date);
                eventForecast.appendChild(time);
            });
        }
    }
    
    getEventApi();