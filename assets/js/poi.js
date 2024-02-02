$("document").ready(function () {
    var openWeatherAPI = "ffe2c4b50bca7de701389fcca1ad8a3a";
    var latitude;
    var longtitude;
    var restaurants = [];

    //  fetchPlaces("Bristol", "restaurant")

    // Gets city name and fetches coordinates of the city
    function fetchPlaces(town, poi) {

        let latURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + town + "&limit=5&appid=" + openWeatherAPI;

        fetch(latURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                // console.log(data);
                longtitude = data[0].lon;
                latitude = data[0].lat;
                let latlong = latitude + "," + longtitude;

                findPOI(poi, latlong);
            });
    }


    // ***********************
    function findPOI(poi, latlong) {
        placeSearch().then(
            function (data) {
                // console.log(data);
                if (data != null) {
                    for (let i = 0; i < data.results.length && i < 3; i++) {
                        let restaurant = {};
                        restaurant.name = data.results[i].name;
                        restaurant.address = data.results[i].location.address;
                        restaurant.isOpen = data.results[i].closed_bucket;
                        restaurants[i] = restaurant;

                    }

                }
            },

        );


        async function placeSearch() {
            try {
                const searchParams = new URLSearchParams({
                    query: poi,
                    ll: latlong,
                    //   open_now: 'true',
                    sort: 'DISTANCE'
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
    // console.log(restaurants);
});