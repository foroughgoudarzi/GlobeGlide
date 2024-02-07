
   async function findExchangeRate(targetCurrency, baseCurrency){
    var apiURL = " https://v6.exchangerate-api.com/v6/";
    // Sample url format https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
    var key = "d4707b17e4b886f84b0feae4";
    // baseCurrency=$('#search-input1').val();
    //targetCurrency=$('#search-input1').val();
  
    // targetCurrency = "EUR";
    var queryURL = apiURL + key + "/pair/" + baseCurrency + "/" + targetCurrency;
   // console.log(queryURL);
    await fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                  
            if(baseCurrency == "GBP"){
                   conversionRateGBP = data.conversion_rate;
            }
            if(baseCurrency == "USD") {
                conversionRateUSD = data.conversion_rate;
            }
            if(baseCurrency == "EUR") {
                conversionRateEUR = data.conversion_rate;
            }

                   //console.log(conversionRate);
        })

    // })
   }
