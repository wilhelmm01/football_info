//weather API - 
// ApiKeyAuth.apiKey = "aef20bc076b6576a68a8168ed03dc6dc";
// Ticketmaster apiKey = "aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT"


    fetch("https://app.ticketmaster.com/discovery/v2/venues.json?size=100?latlong&apikey=aFemIeE1x3rB7wbi2X9ArZEygXHkEBuT")
    .then(resp => resp.json())
    .then( json => console.log(json))