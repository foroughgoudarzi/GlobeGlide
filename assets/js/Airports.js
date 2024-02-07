// Airports.js with JQuery
const apiKey = 'fw6Ec/tBH67tz+XBdZT+IQ==FDEDGvclxL3GK3HR';


//when button is clicked, get the value of the input and use it to search for the airport
$("#search").on("click",function(){
    const input = $("#countryInput").val();
    const apiUrl = `https://api.api-ninjas.com/v1/airports?name=${input}`;

fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayAirports(data);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
})
//display the airports
const display = $('.display');
function displayAirports(data) {
    if (data.length === 0) {
        display.text ('Oops! No airports found. Please search using the City name.');
        return; // Exit the function early since there's nothing to display
    }
    const heading = $('<h2>')
    .addClass('heading')
   
    display.empty(); // Clear the display
   
    const ul = $('<ul>');
    data.forEach(airport => {
        heading.text('Airports');
        const li = $('<li>')
       .text(airport.name)
       .addClass('airport');
        ul.append(li);
        display.append(heading);
        $(display).append(ul);

        
    });
}




