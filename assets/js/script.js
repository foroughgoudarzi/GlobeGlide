
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

    // find country ISO two letter name

    //  https://api.api-ninjas.com/v1/country?name=

    // Fetches country currency code and 2-letter ISO name
    await findCountryInfo(country);

    // Fetches the name of 3 cities and their coordinates
    await findCities(countryISO2);
    //console.log(cities[0].name)

    // Fetches exchange rate
    await findExchangeRate(currencyCode, "GBP");
    await findExchangeRate(currencyCode, "USD");
    await findExchangeRate(currencyCode, "EUR");

    // remove background image and paragraph
    $("body").css("background-image", "none");
    $(".advert").addClass("d-none");

    // showExchangeRate();
    showExchangeRate();

    // show cities' 
    // $(".city-photo").removeClass("d-none")
    for (let i = 0; i < cities.length; i++) {
        let latlong = cities[i].lat + "," + cities[i].long;
        await findPOI("monument", latlong, "rating");
        // console.log(pointsOfInterest[0].photoId)
        // console.log(cities.length)
        //var id = pointsOfInterest[0].n;
        await findPhoto(pointsOfInterest[0].photoId);
        // $(".city").eq(i).prepend("<img class='card-img-top rounded-3' src='"+photoURL+"' alt='city-monument' width='250px'>");
        $(".city").eq(i).children().eq(0).attr("src", photoURL);
        $("h3").eq(i).text(cities[i].name);
    }
    $(".city-photo").removeClass("d-none")
    $("#exchange-rate").removeClass("d-none");



})


function showExchangeRate() {


    $("td").eq(0).text("1 GBP <---> ");
    $("td").eq(1).text(conversionRateGBP + " " + currencyCode);
    $("td").eq(2).text("1 USD <---> ");
    $("td").eq(3).text(conversionRateUSD + " " + currencyCode);
    $("td").eq(4).text("1 EUR <---> ");
    $("td").eq(5).text(conversionRateEUR + " " + currencyCode);
}


