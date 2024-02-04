// This script gets name of a city and place and return a photo
$("document").ready(function () {
    var openWeatherAPI = "ffe2c4b50bca7de701389fcca1ad8a3a";
    var latitude;
    var longtitude;
   var photoID;

     fetchPlaces("glasgow", "monuments", "rating")
     // sort: popular or newest  
    // Gets city name and fetches coordinates of the city
   async function fetchPlaces(town, poi, sort) {

        let latURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + town + "&limit=5&appid=" + openWeatherAPI;

       await fetch(latURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                //  console.log(data);
                longtitude = data[0].lon;
                latitude = data[0].lat;
                let latlong = latitude + "," + longtitude;

            findPOI(poi, latlong, sort);
                // findPhoto(photoID);
                // console.log(photoID);
            });

            
    }

    
///////////////////////////////////////////////////
function findPhoto(fsq_id){
const options = {method: 'GET', headers: {accept: 'application/json', Authorization: 'fsq3uGJyqb8GYslDA9kCvLI2OQWCPzUPl2HYay7NK0Lzjpw=',}};

fetch(`https://api.foursquare.com/v3/places/${fsq_id}/photos`, options)
  .then(response => response.json())
  .then(function (data) {
    if(data != null){
        console.log(data)
    var photoURL = data[0].prefix+"original"+data[0].suffix;
    $("#image-container").append("<img class='slide' src='"+photoURL+"' alt='Image 1' width='250px'>");
    }
  })
  .catch(err => console.error(err));

}

    // ***********************
   async function findPOI(poi, latlong, sort) {
        placeSearch().then(
            function (data) {
                // console.log(data);
                if (data != null) {
                       photoID = data.results[0].fsq_id;
                    console.log(photoID);
                    findPhoto(photoID);


                }
            },

        );


        async function placeSearch() {
            try {
                const searchParams = new URLSearchParams({
                    query: poi,
                    ll: latlong,
                    //   open_now: 'true',
                    sort: sort
                });
                const result = await fetch(
                    `https://api.foursquare.com/v3/places/search?${searchParams}`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'fsq3uGJyqb8GYslDA9kCvLI2OQWCPzUPl2HYay7NK0Lzjpw=',
                        }
                    }
                );
                const data = await result.json();
                return data;
            } catch (err) {
                console.error(err);
            }
        }
    }
});