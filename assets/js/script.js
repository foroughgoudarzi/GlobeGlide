$("document").ready(function () {
    var openWeatherAPI = "ffe2c4b50bca7de701389fcca1ad8a3a";

    //$("#go").on("submit", function (search) {
    debugger;
    var apiURL = " https://v6.exchangerate-api.com/v6/";
    // Sample url format https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
    var key = "da71ae6c9f13b9863cd3010f";
    // baseCurrency=$('#search-input1').val();
    //targetCurrency=$('#search-input1').val();
    baseCurrency = "EUR";
    targetCurrency = "GBP";
    var queryURL = apiURL + key + "/pair/" + baseCurrency + "/" + targetCurrency;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //       console.log(data);
        })

    // })


    // restuarant
    // Gets city name and fetches coordinates of the city
    function fetchRestaurantsInfo(town) {

        let latURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + town + "&limit=5&appid=" + openWeatherAPI;

        fetch(latURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                longtitude = data[0].lon;
                latitude = data[0].lat;

                var spoonAPI = "83b74f9ac1fb498da57d942df6e9aa7b"

                var querySpoon = "https://api.spoonacular.com/food/restaurants/search?lat=" + latitude + "&lng=" + longtitude + "&apiKey=" + spoonAPI;

                fetch(querySpoon)
                    .then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        console.log(data);
                        if (data != null) {
                            for (let i = 0; i < data.length && i < 3; i++) {
                                let address = data[i].address.street_addr;
                                let cuisines = data[i].cuisines.toString();
                                let today = dayjs().format('dddd');
                                let opening = data[i].local_hours.operational[today];
                            }

                        }

                    });

            });
    }

});