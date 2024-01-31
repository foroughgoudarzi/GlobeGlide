//$("#go").on("submit", function (search) {
    debugger;
    var apiURL = " https://v6.exchangerate-api.com/v6/";
    // Sample url format https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
    var key = "da71ae6c9f13b9863cd3010f"; 
   // baseCurrency=$('#search-input1').val();
    //targetCurrency=$('#search-input1').val();
    baseCurrency="EUR";
    targetCurrency="GBP";
    var queryURL = apiURL + key +"/pair/" + baseCurrency + "/" + targetCurrency ;
    console.log(queryURL);
    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
   
 // })