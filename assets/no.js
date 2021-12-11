var currentEvent = document.getElementById("currentEvent")


var requestURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=" + place + "&apikey=aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT";
        // console.log("API Link: " + requestURL)  
        fetch(requestURL)
            .then(function (response) {
                return response.json();
            })
            .then (function(data){
                    
                    //Creating the elements for display
                var eventName = document.createElement('h3');
                eventName.textContent =(data._embedded.events[0].name);
                var city = document.createElement('h4');
                city.textContent=(data._embedded.events[0].city);
                var date = document.createElement('p');
                date.textContent=(data._embedded.events[0].dates.start.localDate);
                currentEvent.appendChild(eventName);
                currentEvent.appendChild(city);
                currentEvent.appendChild(date);
                currentEvent.appendChild(time);
            });
        
    
    getEventApi();