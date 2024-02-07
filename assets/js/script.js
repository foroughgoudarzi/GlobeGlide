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
    findExchangeRate(currencyCode, "GBP");
    findExchangeRate(currencyCode, "USD");
    findExchangeRate(currencyCode, "EUR");

   

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
     $("#map").removeClass("d-none");

})


function showExchangeRate() {


    $("td").eq(0).text("1 GBP <---> ");
    $("td").eq(1).text(conversionRateGBP + " " + currencyCode);
    $("td").eq(2).text("1 USD <---> ");
    $("td").eq(3).text(conversionRateUSD + " " + currencyCode);
    $("td").eq(4).text("1 EUR <---> ");
    $("td").eq(5).text(conversionRateEUR + " " + currencyCode);
}

$("#poiselector").on("change", async function () {
    var x = document.getElementById("poiselector").value;
    if(x != "Select a point of interest" && x!= "Map"){
    let index = cities.findIndex(elm=> elm.name ==city);
    const coord = cities[index].lat + "," + cities[index].long;

   await findPOI(x, coord, 'relevance');
   
    $(".poi-address").children( ".poi-par" ).remove();

    for (let i = 0; i < 3 && i < pointsOfInterest.length; i++) {
      console.log(pointsOfInterest)
        $(".poi-address").append("<p class='ms-2 poi-par'><span>name: </span>" + pointsOfInterest[i].name + ", <span>address: </span>" + pointsOfInterest[i].address + ", <span>isOpen: </span>" + pointsOfInterest[i].isOpen+"</p>");
    }
    $(".poi-address").removeClass("d-none");
} else if (x == "Map"){
    // to map code
    searchCity();
    
} else {
    $(".poi-address").addClass("d-none");
}
    
});

$(".city").click(function () {
    $(".poi-address").children( ".poi-par" ).remove();
    city = $(this).children().eq(1).children().eq(0).text();
    $(".city-name").text(city);
    $("#poiselector").removeClass("d-none");
    $(".city-name").removeClass("d-none");
    $(".poi-container").removeClass("d-none");
})