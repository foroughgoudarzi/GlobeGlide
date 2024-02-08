var country;
var cities = [];
var city;
var currencyCode;
var countryISO2;
var conversionRateGBP;
var conversionRateUSD;
var conversionRateEUR;
var pointsOfInterest = [];
var photoURL;

$("#search").click(async function () {
    country = $("#countryInput").val();
    $("#country-info").addClass("d-none");
    $(".city-photo").addClass("d-none");

    // Fetches country currency code and 2-letter ISO name
    await findCountryInfo(country);

    // Fetches the name of 3 cities and their coordinates
    await findCities(countryISO2);

    // Fetches exchange rate
    // findExchangeRate(currencyCode, "GBP");
    // findExchangeRate(currencyCode, "USD");
    // findExchangeRate(currencyCode, "EUR");

    // show cities' 
    for (let i = 0; i < cities.length; i++) {
        let latlong = cities[i].lat + "," + cities[i].long;
        await findPOI("monument", latlong, "rating");
        await findPhoto(pointsOfInterest[0].photoId);
        $(".city").eq(i).children().eq(0).attr("src", photoURL);
        $("h3").eq(i).text(cities[i].name);
    }
    $(".city-photo").removeClass("d-none");
    $("#exchange-rate").removeClass("d-none");
    $(".poi").removeClass("d-none");
    $("#country-info").removeClass("d-none");

    $("#poiselector").addClass("d-none");
    $(".city-name").addClass("d-none");
    $(".poi-address").addClass("d-none");
    $(".poi-container").addClass("d-none");

    // showExchangeRate();
    showExchangeRate();
})


function showExchangeRate() {


    //Updates the Exchange rate display text   
    $("td").eq(0).html("<img id='countryicon' src='./assets/images/imgGBP.png' alt='UK Currency Image'><span> GBP &nbsp; --> &nbsp; </span> ");
    $("td").eq(1).html(conversionRateGBP + " &nbsp  " + currencyCode);

    $("td").eq(2).html("<img id='countryicon'  src='./assets/images/imgUS.png' alt='US Currency Image'><span> USD &nbsp; -->&nbsp; </span> ");
    $("td").eq(3).html(conversionRateUSD + " &nbsp  " + currencyCode);

    $("td").eq(4).html("<img id='countryicon'  src='./assets/images/imgEUR.png'alt='Euro Currency Image'><span> EUR  &nbsp; -->&nbsp; </span>");
    $("td").eq(5).html(conversionRateEUR + " &nbsp " + currencyCode);
}

$("#poiselector").on("change", async function () {
    var x = document.getElementById("poiselector").value;
    if (x != "Select a point of interest" && x != "Map") {
        let index = cities.findIndex(elm => elm.name == city);
        const coord = cities[index].lat + "," + cities[index].long;

        await findPOI(x, coord, 'relevance');

        $(".poi-address").children(".poi-par").remove();

        for (let i = 0; i < 3 && i < pointsOfInterest.length; i++) {
            console.log(pointsOfInterest)
            $(".poi-address").append("<p class='ms-2 poi-par'><span id='span-poi'>Name: </span>" + pointsOfInterest[i].name + ",<br> <span id='span-poi'>Address: </span>" + pointsOfInterest[i].address + ",<br> <span id='span-poi'>Status: </span>" + pointsOfInterest[i].isOpen + "</p>");
        }
        $(".poi-address").removeClass("d-none");
    } else if (x == "Map") {
        // to map code
        searchCity();
        $("#map").removeClass("d-none");

    } else {
        $(".poi-address").addClass("d-none");
    }

});

$(".city").click(function () {
    $(".poi-address").children(".poi-par").remove();
    city = $(this).children().eq(1).children().eq(0).text();
    $(".city-name").text(city);
    $("#poiselector").removeClass("d-none");
    $(".city-name").removeClass("d-none");
    $(".poi-container").removeClass("d-none");
    $('#poiselector').get(0).selectedIndex = 0;
    $("#map").addClass("d-none");
})