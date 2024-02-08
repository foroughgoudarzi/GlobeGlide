
async function findExchangeRate(targetCurrency, baseCurrency) {
    var apiURL = " https://v6.exchangerate-api.com/v6/";
    // Sample url format https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
    var key = "2b04e40af60f7fe4942e1caa";

    var queryURL = apiURL + key + "/pair/" + baseCurrency + "/" + targetCurrency;
    await fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            if (baseCurrency == "GBP") {
                conversionRateGBP = data.conversion_rate;
            }
            if (baseCurrency == "USD") {
                conversionRateUSD = data.conversion_rate;
            }
            if (baseCurrency == "EUR") {
                conversionRateEUR = data.conversion_rate;
            }
        })

}
