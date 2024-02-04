$("document").ready(function () {
    var country = 'GB'
var cityURL = "https://api.api-ninjas.com/v1/city?limit=4&country="+country;

const options = {method: 'GET', headers: { 'X-Api-Key': 'gIwyTkDqoA75tjYxtQ6Ekg==gRZqiF97MWDqvyrH'},};



fetch(cityURL, options)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
      
    });


  //  https://api.api-ninjas.com/v1/city?country=FR







});